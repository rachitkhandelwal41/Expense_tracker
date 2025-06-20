import  { useState } from 'react'
import { InputBox } from '../components/InputBox'
import Dropdown from '../components/DropDown'
import DateSelector from '../components/DateSelector';
import { AddNoteModal } from '../components/AddNoteModal';
import { create } from '../services/operations/receipt';
import ExpensesTable from '../components/ExpensesTable';
import { useNavigate } from 'react-router-dom';

const expenseCategory=["Food","Rent","Shopping","Transport","Entertainment","Healthcare","Utilities","Other"];
const paymentMethod=["UPI", "Credit Card", "Debit Card", "Cash", "Net Banking"]


const DashBoard = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate= useNavigate()
    function reportChange(){
         navigate("/reports")
    }
    function budgetChange(){
         navigate("/budget")
    }
    const[receipt,setReceipt]=useState({
        amount:0.0,
        category:"Food",
        date:new Date(),
        paymentMethod:"Upi",
        description:"",
        notes:""

    })
    function changeHandler(name: string, value: string) {
  setReceipt((prev) => ({
    ...prev,
    [name]: name === "date" ? new Date(value) : value,
  }));
}

   async function handleClick(event:any){
        event.preventDefault();
        const formattedDate = receipt.date.toISOString();
        try{


        const response=await create(
         Number(receipt.amount),
        receipt.category,
        formattedDate,
        receipt.paymentMethod,
        receipt.description,
        receipt.notes
        );
       if(response){
       setReceipt({
  amount: 0.0,
  category: "Food",
  date: new Date(),
  paymentMethod: "Upi",
  description: "",
  notes: ""
});

       }
    }catch (error: any) {
     alert(error.message || "Something went wrong during signup.");
  }
    }
  return (
    <div className='bg-black to-gray-500 h-screen w-screen'>
     <div className="text-white text-5xl flex justify-center font-serif pt-10">
        Expense Tracker
     </div>
     <div className='flex justify-between text-white pt-18 px-14 items-center'>
        <div >
            <InputBox   name="amount" text="amount" placeholder="Enter your Expense" type="number" onchange={changeHandler}></InputBox>
        </div>
        <div>
            <Dropdown name="category" text="Choose Category" items={expenseCategory} onSelect={changeHandler}/>
        </div>
        <div>
          <DateSelector onSelect={changeHandler} />
 
        </div>
        <div>
             <Dropdown name="paymentMethod" text="Payment Method"items={paymentMethod} onSelect={changeHandler}/>
        </div>
        <div>
            <InputBox  value={receipt.description} name="description" text="Description" placeholder='Description' type="text" onchange={changeHandler} ></InputBox>
        </div>
         <div className="flex items-center">
      {/* SVG Button */}
      <button
        className="p-2 hover:bg-white/10 rounded"
        onClick={() => setShowModal(true)}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="8"
            y="8"
            width="32"
            height="32"
            rx="4"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <line
            x1="24"
            y1="16"
            x2="24"
            y2="32"
            stroke="white"
            strokeWidth="2"
          />
          <line
            x1="16"
            y1="24"
            x2="32"
            y2="24"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </button>

      {/* Modal appears when showModal is true */}
      {showModal && <AddNoteModal setShowModal={setShowModal} setNote={(note) => setReceipt(prev => ({ ...prev, notes: note }))} />}

    </div>
        <div>
           <button onClick={handleClick} className="border  bg-sky-400 rounded-2xl text-black px-6 py-2 text-xl font-bold cursor-pointer">
  Add Receipt
</button>

        </div>
        
     </div>
     <div className='flex'>
     <div className='ml-14 mt-12'>
          <button onClick={reportChange} className="border  bg-sky-400 rounded-2xl text-black px-6 py-2 text-xl font-bold cursor-pointer">View Reports</button>
     </div>
     <div className='ml-14 mt-12'>
          <button onClick={budgetChange} className="border  bg-sky-400 rounded-2xl text-black px-6 py-2 text-xl font-bold cursor-pointer">Budget</button>
     </div>
     </div>
     <div className='mx-9'>
        
             <ExpensesTable/>

            
        </div>
    </div>
  )
}

export default DashBoard