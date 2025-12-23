import { useState } from "react";



function Search(){
    const [form, setForm] = useState({last_name: ""})
    const handleChange = (event) => {
        const {name, value} = event.target;
        setForm((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`${form.last_name}`);
    }

    return (
        <div>
            <h1>Search form</h1>
            <form action="" onSubmit={handleSubmit}>
                <input type="text"  name="last_name" value={form.last_name} onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
        
    )

}

export default Search;