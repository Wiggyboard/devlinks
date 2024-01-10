import './styles.css';
import { useState } from 'react';
import Header from './Header';
import PhoneMockupSection from './PhoneMockupSection';
import CustomizeLinksSection from './CustomizeLinksSection';
import ProfileDetailsSection from './ProfileDetailsSection';
import PreviewHeader from './PreviewHeader';
import PreviewPage from './PreviewPage';

export default function App() {
	const [selectedTab, setSelectedTab] = useState('Links');
	const [lastTab, setLastTab] = useState('Links')
	const [links, setLinks] = useState([]);
	const [linkId, setLinkId] = useState(1);
	const [profileDetails, setProfileDetails] = useState({ image: '', firstName: '', lastName: '', email: '' });
	const [savedLinks, setSavedLinks] = useState([]);
	const [savedProfileDetails, setSavedProfileDetails] = useState([]);
	const [notificationDisplay, setNotificationDisplay] = useState(false);
	const [notificationText, setNotificationText] = useState('');

	const displayNotification = () => {
		setNotificationDisplay(false);

		setTimeout(() => {
			setNotificationText(
			  selectedTab !== 'Preview' ? 'Your changes have been successfully saved!' : 'The link has been copied to your clipboard!'
			);
			setNotificationDisplay(true);
		  }, 0);
	}

	return (
		<div className='App'>
			{selectedTab !== 'Preview' && (
				<Header
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
					setLastTab={setLastTab}
					setNotificationDisplay={setNotificationDisplay}
				/>
			)}
			{selectedTab === 'Preview' && (
				<PreviewHeader
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
					lastTab={lastTab}
					setNotificationDisplay={setNotificationDisplay}
					displayNotification={displayNotification}
				/>
			)}
			<main className={`main-${selectedTab !== 'Preview' ? 'editor' : 'preview'}`}>
				{selectedTab !== 'Preview' && (
					<PhoneMockupSection
						links={links}
						profileDetails={profileDetails}
					/>
				)}
				{selectedTab === 'Links' && (
					<CustomizeLinksSection
						links={links}
						setLinks={setLinks}
						linkId={linkId}
						setLinkId={setLinkId}
						selectedTab={selectedTab}
						setSavedLinks={setSavedLinks}
						displayNotification={displayNotification}
					/>
				)}
				{selectedTab === 'Profile' && (
					<ProfileDetailsSection
						profileDetails={profileDetails}
						setProfileDetails={setProfileDetails}
						setSavedProfileDetails={setSavedProfileDetails}
						selectedTab={selectedTab}
						displayNotification={displayNotification}
					/>
				)}
				{selectedTab === 'Preview' && (
					<PreviewPage
						savedLinks={savedLinks}
						savedProfileDetails={savedProfileDetails}
					/>
				)}
			</main>
			<div className={`notification ${notificationDisplay ? '' : 'hidden'}`}>
				<img src='images/icon-checkmark.svg'></img>
				<p>{notificationText}</p>
			</div>
		</div>
	);
}