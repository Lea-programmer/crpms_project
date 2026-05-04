import {
    retrieveServiceRecords,
    deleteServiceRecord,
    updateServiceRecord
} from '../api/api.js';

import { useState, useEffect } from 'react';

export default function ManageServiceRecord() {

    const [records, setRecords] = useState([]);
    const [editingRecord, setEditingRecord] = useState(null);

    // FETCH
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await retrieveServiceRecords();
                setRecords(res.getServiceRecords);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // DELETE
    const handleDelete = async (id) => {
        try {
            await deleteServiceRecord(id);
            setRecords(prev => prev.filter(r => r._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    // EDIT
    const handleEdit = (rec) => {
        setEditingRecord(rec);
    };

    // SAVE UPDATE
    const handleUpdate = async () => {
        try {
            await updateServiceRecord(editingRecord._id, editingRecord);

            const res = await retrieveServiceRecords();
            setRecords(res.getServiceRecords);

            setEditingRecord(null);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <h2>MANAGE SERVICE RECORD</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>Record Number</th>
                        <th>Plate Number</th>
                        <th>Service Code</th>
                        <th>Service Date</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {records.map((rec) => (
                        <tr key={rec._id}>
                            <td>{rec.recordNumber}</td>
                            <td>{rec.car?.plateNumber}</td>
                            <td>{rec.service?.serviceCode}</td>
                            <td>{rec.serviceDate}</td>
                            <td>
                                <button onClick={() => handleEdit(rec)}>Edit</button>
                                <button onClick={() => handleDelete(rec._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* EDIT FORM */}
            {editingRecord && (
                <div>
                    <h3>Edit Record</h3>

                    <input
                        value={editingRecord.recordNumber}
                        onChange={(e) =>
                            setEditingRecord({
                                ...editingRecord,
                                recordNumber: e.target.value
                            })
                        }
                    />

                    <input
                        value={editingRecord.serviceDate}
                        onChange={(e) =>
                            setEditingRecord({
                                ...editingRecord,
                                serviceDate: e.target.value
                            })
                        }
                    />

                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingRecord(null)}>Cancel</button>
                </div>
            )}
        </>
    );
}