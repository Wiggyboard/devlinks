export default function SaveBar({ links, setLinks, selectedTab, setSavedLinks, profileDetails, setSavedProfileDetails, displayNotification }) {
    const handleSaveLinks = async (e) => {
        e.preventDefault();

        const updatedLinks = links.map(link => {
            if (link.platform === '') {
                return { ...link, platformError: true };
            } else {
                return { ...link, platformError: false };
            }
        });

        const updatedLinks2 = updatedLinks.map(link => {
            if (link.slug === 'devto') {
                if (!link.url.includes('https://www.dev.to')) {
                    return { ...link, urlError: true };
                } else {
                    return { ...link, urlError: false };
                }
            }
            if (link.slug === 'freecodecamp') {
                if (!link.url.includes('https://www.freecodecamp')) {
                    return { ...link, urlError: true };
                } else if (!link.url.includes('.org/') && !link.url.includes('.com/')) {
                    return { ...link, urlError: true };
                } else {
                    return { ...link, urlError: false };
                }
            } else {
                if (!link.url.includes('https://www.')) {
                    return { ...link, urlError: true };
                } else if (!link.url.includes('.com/')) {
                    return { ...link, urlError: true };
                } else if (!link.url.includes(link.slug)) {
                    return { ...link, urlError: true };
                } else {
                    return { ...link, urlError: false };
                }
            }
        });

        setLinks(updatedLinks2);

        setSavedLinks(prevSavedLinks => {
            if (updatedLinks2.every(link => link.platformError === false && link.urlError === false)) {
                displayNotification();
                return updatedLinks2;
            } else {
                return prevSavedLinks;
            }
        });
    }



    const handleSaveProfile = (e) => {
        e.preventDefault();
        displayNotification();
        setSavedProfileDetails(profileDetails);
    }

    return (
        <div id="save-bar">
            <input
                id="save-btn"
                type="submit"
                value="Save"
                onClick={selectedTab === 'Links' ? handleSaveLinks : handleSaveProfile}
            />
        </div>
    )
}