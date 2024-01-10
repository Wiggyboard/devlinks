import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import LinkEditor from './LinkEditor';
import SaveBar from './SaveBar';

export default function CustomizeLinksSection({ links, setLinks, linkId, setLinkId, selectedTab, setSavedLinks, displayNotification }) {
    const addLink = () => {
        setLinks((prevLinks) => {
            const newLink = { id: linkId, platform: '', url: '', slug: '', openOptions: false, platformError: false, urlError: false };
            return [...prevLinks, newLink];
        });
        setLinkId(linkId + 1);
    }

    const onDragEnd = (e) => {
        const { active, over } = e
        if (active.id === over.id) {
            return;
        }
        setLinks(links => {
            const prevIndex = links.findIndex((link) => link.id === active.id);
            const updatedIndex = links.findIndex((link) => link.id === over.id);
            return arrayMove(links, prevIndex, updatedIndex);
        });
    }

    return (
        <form id="customize-links-section">
            <h1>Customize your links</h1>
            <p>Add/edit/remove links below and then share all your profiles with the world!</p>
            <div
                id="add-link-btn"
                onClick={addLink}
            >
                + Add new link
            </div>

            <div id="link-editor-container">
                {links.length === 0 &&
                    <div id="link-editor-empty">
                        <img src="images/illustration-empty.svg" />
                        <h1>Let's get you started</h1>
                        <p>Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!</p>
                    </div>
                }

                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={onDragEnd}
                >
                    <SortableContext
                        items={links}
                        strategy={verticalListSortingStrategy}
                    >
                        {links.map((link, index) => (
                            <LinkEditor
                                key={link.id}
                                links={links}
                                setLinks={setLinks}
                                link={link}
                                index={index}
                            />
                        ))}
                    </SortableContext>
                </DndContext>

            </div>
            <SaveBar
                links={links}
                setLinks={setLinks}
                selectedTab={selectedTab}
                setSavedLinks={setSavedLinks}
                displayNotification={displayNotification}
            />
        </form>
    );
}