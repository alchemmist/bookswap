package com.example.bookswap.controller;

import com.example.bookswap.model.PlaceDto;
import com.example.bookswap.service.PlaceService;
import java.net.URI;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/places")
public class PlaceController {
    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @GetMapping
    public ResponseEntity<List<PlaceDto>> getAllPlaces() {
        List<PlaceDto> places = placeService.getAllPlaces();
        return ResponseEntity.ok(places);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlaceDto> getPlaceById(@PathVariable Integer id) {
        PlaceDto place = placeService.getPlaceById(id);
        return ResponseEntity.ok(place);
    }

    @PostMapping
    public ResponseEntity<PlaceDto> createPlace(@RequestBody PlaceDto placeDto) {
        PlaceDto createdPlace = new PlaceDto();
        createdPlace.setTitle(placeDto.getTitle());
        createdPlace.setFull_address(placeDto.getFull_address());

        placeService.createPlace(createdPlace);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                           .path("/{id}")
                           .buildAndExpand(createdPlace.getId())
                           .toUri();

        return ResponseEntity.created(location).body(createdPlace);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlaceDto> updatePlace(
        @PathVariable Integer id, @RequestBody PlaceDto placeDto) {
        placeDto.setId(id);
        placeService.updatePlace(placeDto);
        return ResponseEntity.ok(placeService.getPlaceById(id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePlace(@PathVariable Integer id) {
        placeService.deletePlace(id);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(org.springframework.dao.EmptyResultDataAccessException.class)
    public void handleNotFound() {
        // TODO: add error logging
    }
}
