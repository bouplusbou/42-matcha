import React from 'react';
import axios from 'axios';

class UploadPhoto extends React.Component {

    state = { 
        file: null,
        authToken: localStorage.getItem('token')
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        const { file, authToken } = this.state;
        const formData = new FormData();
        formData.append('myImage', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(`/users/uploadPhoto${authToken}`, formData, config)
            .then((res) => {
                alert('The file is successfully uploaded');
            })
            .catch((err) => {});
    }
    onChange = (event) => {
        this.setState({ file: event.target.files[0] });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange={this.onChange} />
                <button type="submit">Upload</button>
            </form>
        );
    }
}

export default UploadPhoto