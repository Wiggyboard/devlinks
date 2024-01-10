export default function PhoneMockupSection({ links, profileDetails }) {
    const profileImgContainerStyle = {
        backgroundImage: `url(${profileDetails.image})`,
        border: profileDetails.image ? 'solid 0.3rem var(--purple)' : ''
    }

    const profileNameStyle = {
        background: (profileDetails.firstName || profileDetails.lastName) ? 'none' : 'var(--lightGrey)'
    }

    const profileEmailStyle = {
        background: profileDetails.email ? 'none' : 'var(--lightGrey)'
    }

    return (
        <section id="mocukup-section">
            <div id="mocukup-border"></div>
            <div id="mockup-container">
                <div className="profile-img-container" style={profileImgContainerStyle} />
                <div className="profile-name" style={profileNameStyle}><p>{`${profileDetails.firstName} ${profileDetails.lastName}`}</p></div>
                <div className="profile-email" style={profileEmailStyle}><p>{profileDetails.email}</p></div>
                <div className="link-container">
                    {links.map((link) => (
                        <a className={`link ${link.slug ? `link-${link.slug}` : ''}`} key={link.id} href={link.platform && link.url.includes('https://') ? link.url : null} target="_blank">
                            <img src={link.slug ? `images/icon-${link.slug}.svg` : ''} />
                            <p>{link.platform}</p>
                            <img src={
                                link.slug ? `images/icon-arrow-right${link.slug === 'codepen' || link.slug === 'frontendmentor' ? '-black' : ''}.svg` : ''}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}