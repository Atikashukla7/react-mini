import React, {useEffect, useState} from 'react'

const EditTask = ({task,taskList, setTaskList}) => {
    const [editModal, setEditModal]= useState(false);
    const [projectName, setProjectName] = useState("");
        const [projectDescription, setProjectDescription] = useState("")

        useEffect(()=>{
            setProjectName(task.projectName)
            setProjectDescription(task.projectDescription)
        },[])
    
        const handleUpdate = (e) => {
            e.preventDefault();
            let taskIndex = taskList.indexOf(task);
            taskList.splice(taskIndex,1, {
                projectName:projectName,
                projectDescription:projectDescription,
                timestamp:task.timestamp,
                duration:task.duration
            });
            localStorage.setItem("taskList",JSON.stringify(taskList))
            setEditModal(false);
            
        }
        const handleInput = (e) => {
            const { name, value } = e.target;
    
            if (name === 'projectName') setProjectName(value);
            if (name === 'projectDescription') setProjectDescription(value);
        }

  return (
    <>
        <button className='bg-gray-400 text-white text-sm-uppercase font-semibold py-1.5 px-3 rounded-lg' onClick={()=>{setEditModal(true)}}>Edit</button>

        {
            editModal? (
                <>
                <div className=' flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100'>
                            <div className='w-9/12 bg-white rounded-lg shadow-md relative flex flex-col max-w-lg'>
                                <div className=' flex flex-row justify-between p-5 border-b border-slate-200 rounded-t'>
                                    <h3 className='text-3xl font-semibold'> Add New Task</h3>
                                    <button className='px-1 text-gray-400 float-right text-3xl leading-none font-semibold block' onClick={() => setEditModal(false)}> x </button>

                                </div>

                                <form className='px-6 pt-6 pb-4'>
                                    <label className='tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2' htmlFor='project-name'>Project Name</label>
                                    <input name='projectName' value={projectName} onChange={handleInput} className='w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white' type='text' id='project-name' placeholder='project name'></input>



                                    <div>
                                        <label className='tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2' htmlFor='task-description'> Project Description
                                        </label>
                                        <textarea name="projectDescription"
                                            value={projectDescription} onChange={handleInput} className='w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white' id='task-description' rows='5' placeholder='task description' />

                                    </div>
                                </form>
                                <div className='flex justify-end p-6 border-t border-slate-200 rounded'>
                                    <button className='bg-blue-500 text-white font-semibold uppercase text-sm px-3 py-3 rounded hover:opacity-70' onClick={handleUpdate}>Update Task</button>
                                </div>

                            </div>
                        </div>
                </>
            ):null
        }
    </>

  )
}

export default EditTask