import  { useState } from "react";
interface AddNoteModalProps {
  setShowModal: (value: boolean) => void;
  setNote: (note: string) => void;
}
export const AddNoteModal:React.FC<AddNoteModalProps> = ({ setShowModal,setNote }) => {
  const [content, setContent] = useState("");

  const handleSave = () => {
    setNote(content); // <-- Send note back
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black p-6 rounded-2xl shadow-lg w-full max-w-md mx-4 animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Note</h2>

        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-400"
        />

        <div className="flex justify-end mt-4 space-x-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};


