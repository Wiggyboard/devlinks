export default function PreviewPage({ savedLinks, savedProfileDetails }) {
    const profileImgContainerStyle = {
        backgroundImage: `url(${savedProfileDetails.image})`,
        border: savedProfileDetails.image ? 'solid 0.3rem var(--purple)' : ''
    }

    const profileNameStyle = {
        display: (savedProfileDetails.firstName || savedProfileDetails.lastName) ? 'block' : 'none',
        background: 'none'
    }

    const profileEmailStyle = {
        display: savedProfileDetails.email ? 'block' : 'none',
        marginTop: (!savedProfileDetails.firstName || !savedProfileDetails.lastName) ? '3rem' : '',
        background: 'none'
    }

    return (
        <section>
            <div id="purple-bg" />
            <div id="preview-container">
                <div className="profile-img-container" style={profileImgContainerStyle} />
                <div className="preview-profile-name profile-name" style={profileNameStyle}>
                    <p>{`${savedProfileDetails.firstName} ${savedProfileDetails.lastName}`}</p>
                </div>
                <div className="preview-profile-email profile-email" style={profileEmailStyle}>
                    <p>{savedProfileDetails.email}</p>
                </div>
                <div className="link-container">
                    {savedLinks && savedLinks.map((link) => (
                        <a
                            className={`link ${link.slug ? `link-${link.slug}` : ''}`}
                            key={link.id}
                            href={link.url}
                            target="_blank"
                        >
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
    )
}