import SaveBar from "./SaveBar";

export default function ProfileDetailsSection({ setLinks, profileDetails, setProfileDetails, selectedTab, setSavedProfileDetails, displayNotification }) {
    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setProfileDetails({ ...profileDetails, image: e.target.result })
        }

        reader.readAsDataURL(image);
    }

    const handleFirstNameInputChange = (e) => {
        setProfileDetails({ ...profileDetails, firstName: e.target.value })
    }

    const handleLastNameInputChange = (e) => {
        setProfileDetails({ ...profileDetails, lastName: e.target.value })
    }

    const handleEmailInputChange = (e) => {
        setProfileDetails({ ...profileDetails, email: e.target.value })
    }

    const imageUploadContainerStyle = {
        backgroundImage: `url(${profileDetails.image})`,
        color: profileDetails.image ? 'white' : 'var(--purple)'
    }

    return (
        <section id="profile-details-section">
            <h1>Profile details</h1>
            <p>Add your details to create a personal touch to your profile.</p>
            <div id="profile-picture-container">
                <p>Profile picture</p>
                <div id="image-upload-container" className={profileDetails.image ? 'pseudo' : ''} style={imageUploadContainerStyle}>
                    <img src={`images/icon-upload-image${profileDetails.image ? '-white' : ''}.svg`} />
                    <p>{profileDetails.image ? 'Change image' : '+ Upload Image'}</p>
                    <input type="file" onChange={handleImageUpload} />
                </div>
                <p>Image must be below 1024x1024px. Use PNG, JPG, or BMP format.</p>
            </div>
            <div id="details-container">
                <label htmlFor="fname">First name</label>
                <input type="text" id="fname" name="fname" value={profileDetails.firstName} onChange={handleFirstNameInputChange} />
                <label htmlFor="lname">Last name</label>
                <input type="text" id="lname" name="lname" value={profileDetails.lastName} onChange={handleLastNameInputChange} />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={profileDetails.email} onChange={handleEmailInputChange} />
            </div>
            <SaveBar
                setLinks={setLinks}
                selectedTab={selectedTab}
                profileDetails={profileDetails}
                setSavedProfileDetails={setSavedProfileDetails}
                displayNotification={displayNotification}
            />
        </section>
    );
}