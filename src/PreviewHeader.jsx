export default function PreviewHeader({ setSelectedTab, lastTab, setNotificationDisplay, displayNotification }) {
    const handleTabClick = (tab) => {
        setNotificationDisplay(false);
        setSelectedTab(tab);
    }

    return (
        <header id="preview-header">
            <button
                className="header-left header-tab"
                id="back-to-editor-btn"
                onClick={() => handleTabClick(lastTab)}
            >
                Back to Editor
            </button>
            <button
                className="header-right header-tab"
                id="share-link-btn"
                onClick={displayNotification}
            >
                Share Link
            </button>
        </header>
    );
}