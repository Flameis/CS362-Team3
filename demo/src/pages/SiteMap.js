import '../styles/general.css'; // Import the general CSS file

function SiteMap() {
  return (
    <div style={{padding:'5px'}}>
      <img src='silly-logo/Logo-no-circle.png' style={{width:'unset'}}/><br />
      <p style={{display:'unset'}}>
      <a href="/map">/map</a><br />
      <a href="/login">/login</a><br />
      <a href="/account">/account</a><br />
      <a href="/register">/register</a><br />
      <a href="/display-plants">/display-plants</a><br />
      <a href="/sitemap">/sitemap</a><br />
      </p>
    </div>
  );
}

export default SiteMap;
