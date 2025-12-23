import { use } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserUpdate(){
    const id = useParams().userId;
    console.log("User ID in Update Component:", id);
    const [formData, setFormData] = useState({first_name: '', last_name: '', location: '', occupation: '', description: ''});
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8081/api/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("Update response data:", data);
            if(data.status === 200){
                alert('User updated successfully');
                window.location.reload();
            } else {
                alert('Failed to update user: ' + (data.message || 'Unknown error') );
            }
            
        }catch (err) {  
            console.error("Failed to update user:", err);
        }
    }

    return (
        <div>
          <h1>Update data</h1>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="first_name">First Name:</label>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
            <br />
            <label htmlFor="last_name">Last Name:</label>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
            <br />
            <label htmlFor="location">Location:</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
            <br />
            <label htmlFor="occupation">Occupation:</label>
            <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />
            <br />
            <label htmlFor="description">Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            <br />
            <button type="submit">Update User</button>
          </form>
        </div>
    )
}

export default UserUpdate;