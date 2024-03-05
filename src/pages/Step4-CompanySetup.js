import React, {useState, useEffect } from 'react'
// import AuthContext from '../context/AuthContext';
import {Link} from 'react-router-dom';
import { endpoints } from '../utils/endpoints';
import storageComunicator from '../utils/storageComunication';
import { useNavigate } from 'react-router-dom'

const CompanySetup = () => {
    let company_info =  storageComunicator.company.get_info();

    const navigate = useNavigate()

    const [nr_employee, setNr_employee] = useState(company_info.nr_employees);
    const [cod_CAEN, setCod_CAEN] = useState(company_info.cod_CAEN);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [added_departments, setAdded_departments] = useState([]);
    const [departments_loading, setDepartments_loading] = useState(true);


    const fetch_generated_departments = async () => {
        setDepartments_loading(true);
        try {
            const response = await fetch(endpoints.company.generate_departments, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + String(storageComunicator.authToken.get().access)
                }
            }).then( async (response) => {

                const data = await response.json();
                console.log(data)
                setDepartments(data);
                setDepartments_loading(false);
            });

        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetch_generated_departments();
    }, []);

    const handle_nr_employees_change = async (e) => {
        e.preventDefault();
        console.log(e.target.nr_employee.value)
        await fetch(endpoints.company.set_nr_employees,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization':'Bearer ' + String(storageComunicator.authToken.get().access),
                },
                body: JSON.stringify({
                    nr_employees: e.target.nr_employee.value
                })
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            storageComunicator.company.set_info(data);
            fetch_generated_departments();
        })
        
    }
    const handleCheckboxChange = (e) => {
        const departmentId = e.target.value;
        if (selectedDepartments.includes(departmentId)) {
            setSelectedDepartments(selectedDepartments.filter(id => id !== departmentId));
        } else {
            setSelectedDepartments([...selectedDepartments, departmentId]);
        }
    };
    const handle_cod_caen_change = async (e) => {
        e.preventDefault();
        // console.log(e.target.cod_CAEN.value)
        await fetch(endpoints.company.set_cod_caen,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization':'Bearer ' + String(storageComunicator.authToken.get().access),
                },
                body: JSON.stringify({
                    cod_CAEN: e.target.cod_CAEN.value
                })
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            storageComunicator.company.set_info(data);
            fetch_generated_departments();
        })
    }

    const handle_set_company_departments = async (e) => {

        e.preventDefault();
        // let departments = e.target.departments;
        const form = e.target;

        // const selectedDepartments = Array.from(form.departments)
        //     .filter(department => department.checked)
        //     .map(department => department.value);
        var ids = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(function(checkbox){
            return checkbox.value;
        });
        console.log(ids);
        // console.log(selectedDepartments);
        await fetch(endpoints.company.set_company_departments,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization':'Bearer ' + String(storageComunicator.authToken.get().access),
                },
                body: JSON.stringify({
                    departments: ids
                })
            }
        )
        .then(response => response.json())
        .then(data => {
            // console.log("kasjdnkfjsdgfsjkhgdfjkshdfgkshjdgf", data);
            storageComunicator.company.set_departments(data);
            navigate('/step5');
        })
    };

    const addDepartment = async (e) => {
        let addDepartmentsInput = document.getElementById("addDepartments")
        console.log(e)
        console.log(addDepartmentsInput.value)
        setAdded_departments([...added_departments, addDepartmentsInput.value])
        // setDepartments([{name: addDepartmentsInput.value, description: ""}, ...departments])
    }
    const sendToBackend = async ()=>{
        console.log(selectedDepartments);
        await fetch(endpoints.company.set_company_departments,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization':'Bearer ' + String(storageComunicator.authToken.get().access),
                },
                body: JSON.stringify({
                    departments: selectedDepartments
                })
            }
        )
        .then(response => response.json())
        .then(data => {
            // console.log("kasjdnkfjsdgfsjkhgdfjkshdfgkshjdgf", data);
            // storageComunicator.company.set_departments(data);
            navigate('/step5');
        })
    }

    const set_department_name = (e, department, index) => {
        console.log("e: ", e)
        console.log("department: ", department)
        console.log("index: ", index)
        console.log("new text: ", e.target.textContent)
        let dep = selectedDepartments;
        dep[index] = e.target.textContent;
        setSelectedDepartments(dep);
    }

    return (
        <div className='steps-background flex flex-col items-center justify-center space-y-4 space-x-4'>
            <div className="space-y-2 bg-[rgba(255,255,255,0.58)] p-4 rounded-md shadow-2xl">
                <form className="" onSubmit={handle_cod_caen_change}>
                    <label htmlFor="cod_CAEN" className="text-neutral-700 font-bold">Cod CAEN</label>
                    <div className='flex space-x-[3px] items-center'>
                        <input className="text-center p-1 border rounded-xl" name="cod_CAEN" type="text" value={cod_CAEN} onChange={(e) => setCod_CAEN(e.target.value)} />
                        <button type="submit" className="p-1 px-2 text-white font-bonder bg-green-400 h-fit rounded-md hover:bg-green-500">✓</button>
                    </div>
                </form>
                <form className="" onSubmit={handle_nr_employees_change}>
                    <label htmlFor="nr_employee" className="text-neutral-700 font-bold">Numar de angajati</label>
                    <div className='flex space-x-[3px] items-center'>
                        <input className="text-center p-1 border rounded-xl" name="nr_employee" type="number" value={nr_employee} onChange={(e) => setNr_employee(e.target.value)} />
                        <button type="submit" className="p-1 px-2 text-white font-bonder bg-green-400 h-fit rounded-md hover:bg-green-500">✓</button>
                    </div>
                </form>
            </div>
            <div className="">
                <div className="text-xl font-bold mb-2 text-center" >Selectati departamentele</div>
                    <div className="flex justify-center">
                    
                    <div className={`flex flex-col h-[60vh] p-2 bg-[rgba(255,255,255,0.58)] p-0.5 rounded-md shadow-2xl border rounded-md shadow-md`} onSubmit={handle_set_company_departments}>
                        {departments_loading ? "" :
                        <div className="flex flex-col">
                            <label htmlFor="addDepartments" className="text-neutral-700 font-bold">Adauga departament</label>
                            <div className='flex w-full'>
                                <input type="text" id="addDepartments" className="p-1 grow border rounded-md" placeholder="Add department" />
                                <button type="button" className="p-1 px-2 text-white font-bonder bg-green-400 h-fit rounded-md hover:bg-green-500" onClick={addDepartment}>✓</button>
                            </div>
                        </div>
                        }

                        {/* wrapper 1 */}
                        <fieldset name="departments" className={`${departments_loading ? "animate-pulse after:content-['Loading_...'] after:text-2xl after:font-bold after:text-center after:my-auto" : ""} min-w-[400px] max-w-[400px] h-[60vh] overflow-auto space-y-2 flex flex-col`}>
                            {departments_loading ? "" :

                            departments.map((department, index) => (
                            <label htmlFor={department.name} className='hover:bg-neutral-100 p-2' key={index}>
                                <div className="flex space-x-2 ">
                                    <input checked={selectedDepartments.includes(department.name)} onChange={handleCheckboxChange} type="checkbox" id={department.name} value={department.name} className="" />
                                    <div className="text-lg font-bold text-neutral-800">{department.name}</div>
                                </div>
                                <div className="text-sm capitalize ">{department.description}</div>
                            </label>
                            ))}
                            {departments_loading ? "" :
                            added_departments.map((department, index) => (

                                <label htmlFor={department} className='hover:bg-neutral-100 p-2' key={index}>
                                    <div className="flex space-x-2 ">
                                        <input checked={selectedDepartments.includes(department)} onChange={handleCheckboxChange} type="checkbox" id={department} value={department} className="" />
                                        <div className="text-lg font-bold text-neutral-800">{department}</div>
                                    </div>
                                    <div className="text-sm capitalize ">Description</div>
                                </label>
                            )
                            )}
                        </fieldset>
                        <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Regenerate</button>
                    </div>
                    {/*  wrapper 2 */}
                    <div className='bg-[rgba(255,255,255,0.58)] ml-4 p-2 rounded-md shadow-2xl min-w-[400px] max-w-[400px] h-[60vh] overflow-auto space-y-2 border rounded-md shadow-md flex flex-col justify-between'>

                        <div className="flex flex-col">
                                <div className="font-bold text-lg text-center ">Selected Departments</div>
                                {selectedDepartments.map((department, index) => (
                                    <div className="flex justify-between p-2" key={index}>
                                        <div contentEditable="true" className="text-lg font-bold text-neutral-800" onInput={(e) => set_department_name(e, department, index)}>{department}</div>
                                        <button className="p-1 px-2 text-white font-bonder bg-red-400 h-fit rounded-md hover:bg-red-500" onClick={() => setSelectedDepartments(selectedDepartments.filter(id => id !== department))}>✕</button>
                                    </div>
                                ))}

                        </div>
                            <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={sendToBackend}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup