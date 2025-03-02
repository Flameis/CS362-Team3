import '../styles/general.css'; // Import the general CSS file

function SiteMap() {
  return (
    <div className="sitemap-container">
      <img src='silly-logo/Logo-no-circle.png' className="sitemap-logo"/><br />
      <p className="sitemap-links">
        <a href="/map">/map</a><br />
        <a href="/login">/login</a><br />
        <a href="/account">/account</a><br />
        <a href="/register">/register</a><br />
        <a href="/display-plants">/display-plants</a><br />
        <a href="/sitemap">/sitemap</a><br />
        <a href="/about">/about</a><br />
      </p>
    </div>
  );
}

export default SiteMap;
