import { retrieveServiceRecords, deleteServiceRecord } from '../api/api.js';
import { useState, useEffect } from 'react';

export default function ManageServiceRecord() {

    const [records, setRecords] = useState([]);

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

    
    const handleDelete = async (id) => {
        try {
            await deleteServiceRecord(id);

        
            setRecords(records.filter((rec) => rec._id !== id));

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
                        <th>recordNumber</th>
                        <th>PlateNumber</th>
                        <th>serviceCode</th>
                        <th>serviceDate</th>
                        <th colSpan={2}>action</th>
                    </tr>
                </thead>

                <tbody>
                    {records.map((rec) => (
                        <tr key={rec._id}>
                            <td>{rec.recordNumber}</td>
                            <td>{rec.plateNumber}</td>
                            <td>{rec.serviceCode}</td>
                            <td>{rec.serviceDate}</td>
                            <td>
                                <button>Edit</button>
                                <button onClick={() => handleDelete(rec._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}