import "./Hider.css";

export default function Hider({ layout }) {
  if (layout == "all") {
    return <div className="hiding-all" />;
  } else if (layout == "page") {
    return <div className="hiding-page" />;
  } else {
    console.log(
      "Not correct value of 'layout' parameter for hiding component. Use 'all' or 'page'.",
    );
  }
}
