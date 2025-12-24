
import { useState, useEffect } from "react";

function Test(){

    
    //-------------------------------------------------------------
    // Update comment

    // const [formData, setFormData] = useState({comment: "", photoId: "", commentId: ""})
    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     setFormData((prev) => ({...prev, [name]: value}))
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(`http://localhost:8081/updateComment/${formData.photoId}/${formData.commentId}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({comment: formData.comment})
    //         }).then(res => res.json())
    //         console.log(formData.comment)
    //         alert('OK')
    //     }catch(error){
    //         alert(error)
    //     }
    // } 

    // return (
    //     <div>
    //         <form action="" onSubmit={handleSubmit}>
    //             <label htmlFor="">comment: </label><input type="text" name="comment" value={formData.comment} onChange={handleChange} /><br />
    //             <label htmlFor="">photoId: </label><input type="text" name="photoId" value={formData.photoId} onChange={handleChange} /><br />
    //             <label htmlFor="">commentId: </label><input type="text" name="commentId" value={formData.commentId} onChange={handleChange} /><br />
    //             <button type="submit">Submit</button>

    //         </form>

    //     </div>
    // )
    


    //-------------------------------------------------------------
    //Delete Comment

    // const [formData, setFormData] = useState({photoId: "", commentId: ""})
    

    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     setFormData((prev) => ({...prev, [name]: value}))
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(`http://localhost:8081/commentsOfPhoto/${formData.photoId}/${formData.commentId}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }).then(res => res.json())
    //         alert('OK')
    //     }catch(err){

    //     }
    // }

    // return (
    //     <div>
    //         <form action="" onSubmit={handleSubmit}>
    //             <input type="text" name="photoId" value={formData.photoId} onChange={handleChange}/>
    //             <input type="text" name="commentId" value={formData.commentId} onChange={handleChange}/>
    //             <button type="submit">submit</button>



    //         </form>
    //     </div>
    // )












    //-----------------------------------------------------------------
    //Delete Image

    // const [form, setForm] = useState({id: ""})

    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     setForm((prev) => ({...prev, [name]: value}));

    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await fetch(`http://localhost:8081/api/photo/${form.id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }).then(res => res.json())
    //         alert('Ok')
    //     }catch(error){
    //         alert(error)
    //     }
    // }


    // return (
    //     <div>
    //         <form action="" onSubmit={handleSubmit}>
    //             <input type="text" name="id" value={form.id} onChange={handleChange} />
    //             <button type="submit">Submit</button>
    //         </form>
    //     </div>
    // )




    //------------------------------------------------
    //Delete user

    // const [form, setForm] = useState({id: ""})

    // const handleChange = (event) => {
    //     const {name, value} = event.target;
    //     setForm((prev) => ({...prev, [name]: value}))
    // }
    
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const res = await fetch(`http://localhost:8081/api/user/${form.id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }).then(res => res.json)
    //         alert('oK')

    //     }catch(error){
    //         alert('Faled')
    //     }
    // }

    // return (

    //     <div>

    //         <form action="" onSubmit={handleSubmit}>
    //             <input type="text" name="id" value={form.id} onChange={handleChange} />
    //             <button type="submit">Submit</button>
    //         </form>
    //     </div>
    // )




    //---------------------------------------------------------------------
    // Register

    // const [formData, setFormData] = useState({username: "", password: "", retype_password: "", first_name: "", last_name: "", location: "", describe: "", occupation: ""})

    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     setFormData((prev) => ({...prev, [name]: value}))
    
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(`http://localhost:8081/admin/register`, {
    //             method: 'POST',
    //             body: JSON.stringify(formData),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }).then(res => res.json())

    //         alert('OK')

    //     }catch (err){
    //         alert('Failed')
    //     }
    // }

    // return (
    //     <div className="register-container">
    //     <h1>Register</h1>
    //     <form className="register-form" onSubmit={handleSubmit}>
    //     <label>Username</label>
    //     <input type="text" name="username" value={formData.username} onChange={handleChange} />
    
    //     <label>Password</label>
    //     <input type="password" name="password" value={formData.password} onChange={handleChange} />
    
    //     <label>Retype Password</label>
    //     <input type="password" name="retype_password" value={formData.retype_password} onChange={handleChange} />
    
    //     <label>First name</label>
    //     <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
    
    //     <label>Last name</label>
    //     <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
    
    //     <label>Location</label>
    //     <input type="text" name="location" value={formData.location} onChange={handleChange} />
    
    //     <label>Description</label>
    //     <input type="text" name="description" value={formData.description} onChange={handleChange} />
    
    //     <label>Occupation</label>
    //     <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />
    
    //     <button type="submit">Submit</button>
    //     <br />
    //   </form>
    // </div>
    
    //   )

    //----------------------------------------------------------------------------------------------------------
    // Count comments of image
	
	// const [form, setForm] = useState({id: ""})
	// const [photo, setPhoto] = useState([])
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(null)
	// const handleChange = (event) => {
	// 	const {name, value} = event.target;
	// 	setForm((prev) => ({...prev, [name]: value}))
	// }
	
	// const handleSubmit = async (event) => {
	// 	event.preventDefault();
	// 	try {
	// 		const res = await fetch(`http://localhost:8081/api/photo/${form.id}`).then(res => res.json())
	// 		setPhoto(res);	
	// 		console.log(res)
	// 	}catch(err){
	// 		alert("failed")
    //         setError(error)
	// 	}finally{
    //         setLoading(false)
    //     }
	// }
	
	
	// return (
	// 	<div>
	// 		<form onSubmit={handleSubmit}>
			
	// 			<input type="text" name="id" value={form.id} onChange={handleChange} />
	// 			<button type="submit">Submit</button>
			
	// 		</form>

    //         {loading && <h2>Loading...</h2>}
    //         {error && <h2>error</h2>}s
    //         {photo && photo.map((p) => (
    //             <div>
    //                 <h2>{p.file_name}</h2>
    //                 <h2>There are {p.comments.length} comment</h2>

    //                 {p.comments.length > 0 && p.comments.map((c) => (
    //                     <div>
    //                         <h3>
    //                             {c.comment} | {c.date_time}
    //                         </h3>
    //                     </div>
    //                 ))}
    //             </div>



    //         ))}
		
	// 	</div>
	// )
}

export default Test;