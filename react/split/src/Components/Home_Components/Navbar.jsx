import React from 'react';

const styles = {
  navbar: {
    backgroundColor: '#ededed',
    height: '60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 50px',
  },
  logo: {
    color: '#305E48',
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '3px',
    cursor: 'pointer',
  },
  navbarNav: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
  },
  navItem: {
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: 'black',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
    display: 'block',
    padding: '0 10px',
    width: '120px',
    opacity: 1,
  },
  navLinkHover: {
    color: '#305E48',
    cursor: 'pointer',
    opacity: 1,
  },
  spanStyle: {
    display: 'inline-block'
  },
};

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = React.useState(null);
  const [logoHovered, setLogoHovered] = React.useState(false);

  const splitLetters = (word) => {
    return [...word].map((letter, i) => (
      <span
        key={i}
        className={logoHovered || hoveredLink === word ? "animate-text" : ""}
      >
        {letter}
      </span>
    ));
  };

  return (
    <nav style={styles.navbar}>
      <div
        style={styles.logo}
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
      >
        <a href="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>
          {splitLetters('SPLIT')}
        </a>
      </div>
      <ul style={styles.navbarNav}>
        <li style={styles.navItem}>
          <a
            href="/WorkoutPlanner"
            className="nav-link"
            onMouseEnter={() => setHoveredLink('Workout')}
            onMouseLeave={() => setHoveredLink(null)}
            style={
              hoveredLink === 'Workout'
                ? { ...styles.navLink, ...styles.navLinkHover }
                : { ...styles.navLink }
            }
          >
            {splitLetters('Workout')}
          </a>
        </li>
        <li style={styles.navItem}>
          <a
            href="/NutritionPlanner"
            className="nav-link"
            onMouseEnter={() => setHoveredLink('Nutrition')}
            onMouseLeave={() => setHoveredLink(null)}
            style={
              hoveredLink === 'Nutrition'
                ? { ...styles.navLink, ...styles.navLinkHover }
                : { ...styles.navLink }
            }
          >
            {splitLetters('Nutrition')}
          </a>
        </li>
        <li style={styles.navItem}>
          <a
            href="/SocialForum"
            className="nav-link"
            onMouseEnter={() => setHoveredLink('Social')}
            onMouseLeave={() => setHoveredLink(null)}
            style={
              hoveredLink === 'Social'
                ? { ...styles.navLink, ...styles.navLinkHover }
                : { ...styles.navLink }
            }
          >
            {splitLetters('Social')}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
