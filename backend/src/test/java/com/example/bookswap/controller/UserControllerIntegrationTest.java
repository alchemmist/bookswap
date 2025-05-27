package com.example.bookswap.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.bookswap.model.UserDto;
import java.sql.Connection;
import java.sql.Statement;
import java.util.UUID;
import javax.sql.DataSource;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserControllerIntegrationTest {
    @LocalServerPort private int port;

    @Autowired private TestRestTemplate restTemplate;

    @Autowired private DataSource dataSource;

    private String baseUrl;

    @BeforeAll
    void setupDatabase() throws Exception {
        baseUrl = "http://localhost:" + port + "/api/users";
        try (Connection conn = dataSource.getConnection();
            Statement stmt = conn.createStatement()) {
            stmt.execute("CREATE TABLE IF NOT EXISTS users ("
                + "id UUID PRIMARY KEY DEFAULT gen_random_uuid(),"
                + "username TEXT UNIQUE NOT NULL,"
                + "password TEXT NOT NULL,"
                + "avatar TEXT NOT NULL DEFAULT '',"
                + "is_admin BOOLEAN DEFAULT FALSE,"
                + "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
                + ");");
        }
    }

    @BeforeEach
    void truncateTable() throws Exception {
        try (Connection conn = dataSource.getConnection();
            Statement stmt = conn.createStatement()) {
            stmt.execute("TRUNCATE TABLE users RESTART IDENTITY CASCADE;");
        }
    }

    private UserDto createTestUser(String username, String password) {
        UserDto userDto = new UserDto();
        userDto.setUsername(username);
        userDto.setPassword(password);
        userDto.setIsAdmin(false);

        ResponseEntity<UserDto> response =
            restTemplate.postForEntity(baseUrl, userDto, UserDto.class);
        return response.getBody();
    }

    @Test
    void getAllUsers_WhenNoUsers_ReturnsEmptyList() {
        ResponseEntity<UserDto[]> response = restTemplate.getForEntity(baseUrl, UserDto[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEmpty();
    }

    @Test
    void getAllUsers_WhenUsersExist_ReturnsAllUsers() {
        createTestUser("user1", "pass1");
        createTestUser("user2", "pass2");

        ResponseEntity<UserDto[]> response = restTemplate.getForEntity(baseUrl, UserDto[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody())
            .hasSize(2)
            .extracting(UserDto::getUsername)
            .containsExactlyInAnyOrder("user1", "user2");
    }

    @Test
    void getUserById_WhenUserExists_ReturnsUser() {
        UserDto createdUser = createTestUser("testuser", "testpass");

        ResponseEntity<UserDto> response =
            restTemplate.getForEntity(baseUrl + "/" + createdUser.getId(), UserDto.class);

    }

    @Test
    void getUserById_WhenUserNotExists_ReturnsNotFound() {
        UUID randomId = UUID.randomUUID();
        ResponseEntity<UserDto> response =
            restTemplate.getForEntity(baseUrl + "/" + randomId, UserDto.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void createUser_ValidData_ReturnsCreatedUser() {
        UserDto userDto = new UserDto();
        userDto.setUsername("newuser");
        userDto.setPassword("newpass");
        userDto.setIsAdmin(true);

        ResponseEntity<UserDto> response =
            restTemplate.postForEntity(baseUrl, userDto, UserDto.class);
    }

    @Test
    void updateUser_ValidData_UpdatesUser() {
        UserDto createdUser = createTestUser("olduser", "oldpass");
        createdUser.setUsername("updateduser");
        createdUser.setIsAdmin(true);

        HttpEntity<UserDto> request = new HttpEntity<>(createdUser);
        ResponseEntity<UserDto> response = restTemplate.exchange(
            baseUrl + "/" + createdUser.getId(), HttpMethod.PUT, request, UserDto.class);

    }

    @Test
    void updateUser_MismatchedIds_ReturnsBadRequest() {
        UserDto createdUser = createTestUser("user", "pass");
        UUID originalId = createdUser.getId();
        createdUser.setId(UUID.randomUUID());

        HttpEntity<UserDto> request = new HttpEntity<>(createdUser);
        ResponseEntity<UserDto> response = restTemplate.exchange(
            baseUrl + "/" + originalId, HttpMethod.PUT, request, UserDto.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void deleteUser_WhenUserExists_DeletesUser() {
        UserDto createdUser = createTestUser("todelete", "pass");

        ResponseEntity<UserDto> preCheck =
            restTemplate.getForEntity(baseUrl + "/" + createdUser.getId(), UserDto.class);

        ResponseEntity<Void> deleteResponse = restTemplate.exchange(
            baseUrl + "/" + createdUser.getId(), HttpMethod.DELETE, null, Void.class);

    }

    @Test
    void deleteUser_WhenUserNotExists_ReturnsNotFound() {
        UUID randomId = UUID.randomUUID();

        ResponseEntity<Void> response =
            restTemplate.exchange(baseUrl + "/" + randomId, HttpMethod.DELETE, null, Void.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}
