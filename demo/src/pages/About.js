import '../styles/general.css'; // Import the general CSS file
import '../styles/about.css'; // Import the About CSS file

function About() {
  return (
    <div className="container about-container">
      <p>
        Image attributions:<br/>
        logo was edited together and modified by Jake Thompson from:<br/>
        <a href="https://www.flaticon.com/free-icon/beaver_427502" title="beaver icon" className="about-link">Beaver icon created by Freepik - Flaticon</a><br/>
        <a href="https://www.flaticon.com/free-icon/deforestation_9442954" title="deforestation icon" className="about-link">Deforestation icon created by IconBaandar - Flaticon</a><br/>
      </p>
    </div>
  );
}

export default About;
