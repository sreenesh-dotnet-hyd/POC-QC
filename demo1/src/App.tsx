import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type Employee = {
  id: number | undefined | null,
  name: string | undefined,
  dept: string | undefined
  //retire:(date:Date)=>void
}

function App() {

  const [emps, setEmps] = useState<Employee[]>([]);
  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>();
  const [dept, setDept] = useState<string>();



  const addEmp = (emp: Employee): void => {
    if (emp) {
      setEmps([...emps, emp]);
    } else {
      console.error("failed to add emp");
    }
  }

  const deleteEmp = (empId: number | undefined): void => {
    if (emps.some(emp => emp.id == empId)) {
      setEmps(emps.filter(emp => emp.id != empId));
    } else {
      console.error("failed to delete emp");
    }
  }

  const updateEmp = (empId: number | undefined, newEmp: Employee): void => {
    if (emps.some(emp => emp.id == empId) && empId == newEmp.id) {
      // setEmps(emps.filter(emp=>emp.id!=empId))
      // setEmps([...emps, newEmp]);

      setEmps(prev => prev.map(emp => emp.id == empId ? newEmp : emp))
    } else {
      console.error("failed to update emp");
    }
  }



  return (
    <div className='flex flex-row justify-center gap-12 items-center w-screen h-screen px-12 py-10'>
     <div className="h-[32rem] w-[32rem] bg-[#1e1e1e] p-6 rounded-2xl shadow-lg">
  <h2 className="text-white text-2xl font-semibold mb-6">
    Employees
  </h2>

  {emps.length > 0 ? (
    <div className="bg-[#2a2a2a] rounded-xl overflow-hidden">
      <div className="grid grid-cols-3 bg-[#333] text-gray-300 font-medium px-4 py-3 text-sm">
        <span>ID</span>
        <span>Name</span>
        <span>Department</span>
      </div>
      {emps.map(emp => (
        <div
          key={emp.id}
          className="grid grid-cols-3 px-4 py-3 text-white border-t border-gray-700 hover:bg-[#3a3a3a] transition"
        >
          <span>{emp.id}</span>
          <span>{emp.name}</span>
          <span>{emp.dept}</span>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center h-40 bg-[#2a2a2a] rounded-xl text-gray-400 text-sm">
      No employee data found
    </div>
  )}
</div>

      <div>

        <div className='flex flex-col gap-2 w-50 mt-10'>
          <span className='text-xl'>Add new Employee </span>
          <input className='border border-gray-200 rounded-lg px-4' type='number' onChange={(e) => setId(parseInt(e.target.value))} placeholder='new employee id' />
          <input className='border border-gray-200 rounded-lg px-4' type='string' onChange={(e) => setName(e.target.value)} placeholder='new employee name' />
          <input className='border border-gray-200 rounded-lg px-4' type='string' onChange={(e) => setDept(e.target.value)} placeholder='new employee dept' />
          <button onClick={() => addEmp({ id, name, dept })}>Add employee</button>
        </div>

        <div className='flex flex-col gap-2 w-50 mt-10'>
          <span className='text-xl'>Delete Employee </span>
          <input className='border border-gray-200 rounded-lg px-4' type='number' onChange={(e) => setId(parseInt(e.target.value))} placeholder='existing employee id' />
          <button onClick={() => deleteEmp(id)}>Delete employee</button>
        </div>

        <div className=' flex flex-col gap-2 w-50 mt-10'>
          <span className='text-xl'>Update Employee </span>
          <input className='border border-gray-200 rounded-lg px-4' type='number' onChange={(e) => setId(parseInt(e.target.value))} placeholder='existing employee id' />
          <input className='border border-gray-200 rounded-lg px-4' type='string' onChange={(e) => setName(e.target.value)} placeholder='employee new name' />
          <input className='border border-gray-200 rounded-lg px-4' type='string' onChange={(e) => setDept(e.target.value)} placeholder='employee new dept' />
          <button onClick={() => updateEmp(id, { id, name, dept })}>Update employee</button>
        </div>
      </div>


    </div>
  )
}

export default App
