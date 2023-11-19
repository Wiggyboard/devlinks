import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

export default function LinkEditor({ links, setLinks, link, index }) {
    const removeLink = (linkToRemove) => {
        const updatedLinks = links.filter(link => link.id !== linkToRemove.id);
        setLinks(updatedLinks);
    }

    const togglePlatformOptions = (id) => {
        setLinks(prevLinks => {
            return prevLinks.map(link => {
                if (link.id === id) {
                    return { ...link, openOptions: !link.openOptions };
                }
                else {
                    return { ...link, openOptions: false };
                }
            });
        });
    }

    const setPlatform = (e, id) => {
        const selectedPlatform = e.target.textContent.toString();
        const slug = selectedPlatform.toLowerCase().replace(/[.\s]/g, (char) => {
            if (char === '.') {
                return '';
            } else if (char === ' ') {
                return '';
            }
        });

        setLinks(prevLinks => {
            return prevLinks.map(link => {
                if (link.id === id) {
                    return { ...link, platform: selectedPlatform, slug: slug };
                }
                return link;
            });
        });
    }

    const setUrl = (e, id) => {
        const url = e.target.value.trim();

        setLinks(prevLinks => {
            return prevLinks.map(link => {
                if (link.id === id) {
                    return { ...link, url: url };
                }
                return link;
            });
        });
    }

    const errorTrueStyle = { display: 'block' }
    const errorFalseStyle = { display: 'none' }

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id })
    const dragStyle = {
        transition,
        transform: CSS.Transform.toString(transform),
        zIndex: isDragging ? 1 : 0
    }

    return (
        <div className={`link-editor ${isDragging ? 'dragged' : ''}`} ref={setNodeRef} {...attributes} style={dragStyle}>
            <div className="link-editor-header">
                <img src="static/icon-drag-and-drop.svg" {...listeners} />
                <p>Link #{index + 1}</p>
                <p onClick={() => removeLink(link)}>Remove</p>
            </div>
            <fieldset>
                <label htmlFor='platform-select'>
                    Platform
                    <span className="error-message"
                        style={link.platformError ? errorTrueStyle : errorFalseStyle}>
                        Platform required
                    </span>
                </label>
                <div className="platform-select" onClick={() => togglePlatformOptions(link.id)}>
                    {link.platform ? '' : <p id="platform-select-placeholder">Select platform</p>}
                    <img src={link.slug !== '' ? `static/icon-${link.slug}-gray.svg` : ''} />
                    <p>{link.platform}</p>
                    <img src={link.openOptions ? 'static/icon-chevron-up.svg' : 'static/icon-chevron-down.svg'} />
                    <ul className={link.openOptions ? 'platform-options' : 'platform-options-hidden'}>
                        <li key="codepen" onClick={(e) => setPlatform(e, link.id)}>
                            <img src='static/icon-codepen-gray.svg' />
                            CodePen
                        </li>
                        <li key="codewars" onClick={(e) => setPlatform(e, link.id)}>
                            <img src='static/icon-codewars-gray.svg' />
                            Codewars
                        </li>
                        <li key="devto" onClick={(e) => setPlatform(e, link.id)}>
                            <img src='static/icon-devto-gray.svg' />
                            Dev.to
                        </li>
                        <li key="facebook" onClick={(e) => setPlatform(e, link.id)}>
                            <img src='static/icon-facebook-gray.svg' />
                            facebook
                        </li>
                        <li key="freecodecamp" onClick={(e) => setPlatform(e, link.id)}>
                            <img src='static/icon-freecodecamp-gray.svg' />
                            freeCodeCamp
                        </li>
                        <li key="frontend-mentor" onClick={(e) => setPlatform(e, link.id)}>
                            <img src='static/icon-frontendmentor-gray.svg' />
                            Frontend Mentor
                        </li>
                        <li key="github" onClick={(e) => setPlatform(e, link.id)}>
                            <img src='static/icon-github-gray.svg' />
                            GitHub
                        </li>
                        <li key="gitlab" onClick={(e) => setPlatform(e, link.id)}>
                            <img src='static/icon-gitlab-gray.svg' />
                            GitLab
                        </li>
                        <li key="hashnode" onClick={(e) => setPlatform(e, link.id)}>
                            <img src='static/icon-hashnode-gray.svg' />
                            Hashnode
                        </li>
                        <li key="linkedin" onClick={(e) => setPlatform(e, link.id)}>
                            <img src='static/icon-linkedin-gray.svg' />
                            LinkedIn
                        </li>
                        <li key="stack-overflow" onClick={(e) => setPlatform(e, link.id)}>
                            <img src='static/icon-stackoverflow-gray.svg' />
                            Stack Overflow
                        </li>
                        <li key="twitch" onClick={(e) => setPlatform(e, link.id)}>
                            <img src='static/icon-twitch-gray.svg' />
                            Twitch
                        </li>
                        <li key="twitter" onClick={(e) => setPlatform(e, link.id)}>
                            <img src='static/icon-twitter-gray.svg' />
                            Twitter
                        </li>
                        <li key="youtube" onClick={(e) => setPlatform(e, link.id)}>
                            <img src='static/icon-youtube-gray.svg' />
                            YouTube
                        </li>
                    </ul>
                </div>
                <label htmlFor='url-input'>
                    Link
                    {<span className="error-message" style={link.urlError ? errorTrueStyle : errorFalseStyle}>
                        Valid URL required
                    </span>}
                </label>
                <input
                    className="url-input"
                    type='url'
                    placeholder='e.g. https://www.github.com/example'
                    onChange={(e) => setUrl(e, link.id)}
                    value={link.url}
                    required
                />
            </fieldset>
        </div>
    )
}