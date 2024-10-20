import Layout from '@/components/layout/layout';
import Navbar from '@/components/Navbar/navbar';
import { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';

import axios, { AxiosResponse } from 'axios'
import { BackendAPIResponse } from '@/components/assets/model'
import { doAES } from '@/components/utils';

enum ComplaintStatus {
    UNSOLVED = 'UNSOLVED',
    SOLVED = 'SOLVED',
    PARTIAL = 'PARTIAL'
}

interface IComplaintList {
    id: string;
    status: ComplaintStatus;
    name: string;
}

const dummyData: IComplaintList[] = [
    {
        id: '1234567789',
        status: ComplaintStatus.SOLVED,
        name: 'john'
    },
    {
        id: '1234567789333',
        status: ComplaintStatus.SOLVED,
        name: 'doe'
    }
]

export default function DoctorIndexPage() {
    const [listData, setListData] = useState<IComplaintList[] | [] | null>(null);

    useEffect(() => {
        let ignore = false;
        async function getComplaintList() {
            const result: AxiosResponse<BackendAPIResponse> = await axios.get(
                `${process.env.NEXT_PUBLIC_BE_URL || 'http://localhost:4000'}/healthcare/complaint`
            );
            if(!ignore) {
                if(result.status === 200) {
                    const getData = result.data.data as IComplaintList[]
                    const newData: IComplaintList[] = getData.map(data => {
                        return {
                            id: data.id,
                            status: data.status,
                            name: doAES.decrypt(data.name)
                        }
                    })
                    setListData(newData);
                } else {
                    setListData(dummyData)
                }
            }
        }

        getComplaintList();
        return () => {
            ignore = true;
        }
    }, [listData])

    return (
        <Layout title='Doctor'>
            <main>
                <Navbar />

                <div className='min-h-screen h-auto px-[5%] pt-16 bg-white'>
                    <div className=' pt-5'>   
                        <h3 className='ptm-h3 text-black'>Welcome, Doctor</h3>
                        <h5 className=' ptm-h5 text-gray-800'>Here is the Patient List</h5>
                    </div>

                    <div className=' pt-3'>
                        {
                            listData === null
                            ?
                            <div>
                                <p className=' ptm-p4 text-blue-gray-900 font-semibold'>Loading Data...</p>
                            </div>
                            :
                            <table className=' w-full border-separate border-tools-table-outline border-black border-2 rounded-t-xl'>
                                <thead className='ptm-h5 rounded-t text-white'>
                                    <th className='bg-blue-gray-500 rounded-tl-xl w-[35%]'>Id</th>
                                    <th className='bg-blue-gray-500 w-[30%]'>Name</th>
                                    <th className='bg-blue-gray-500 w-[20%]'>Status</th>
                                    <th className='bg-blue-gray-500 rounded-tr-xl w-[15%]'>Action</th>
                                </thead>
                                <tbody className=' bg-white'>
                                    {listData.map((item) => (
                                        <tr key={item.id} className='border-black border-2'>
                                            <th className='bg-blue-gray-50 ptm-card-btn text-black font-semibold'>{item.id}</th>
                                            <th className='bg-blue-gray-50 ptm-p4 text-black font-semibold'>{item.name}</th>
                                            <th className='bg-blue-gray-50'>
                                                {
                                                    item.status === 'SOLVED'
                                                    ?
                                                    <span className=' bg-green-900 text-white font-bold ptm-p3 py-3 px-5 rounded-xl'>{item.status}</span>
                                                    :
                                                    item.status === 'PARTIAL'
                                                    ?
                                                    <span className=' bg-yellow-900 text-white font-bold ptm-p3 py-3 px-5 rounded-xl'>{item.status}</span>
                                                    :
                                                    <span className=' bg-red-900 text-white font-bold ptm-p3 py-3 px-5 rounded-xl'>{item.status}</span>
                                                }
                                            </th>
                                            <th className='relative h-full w-full bg-blue-gray-50'>
                                                <div className=' flex w-full h-full justify-center items-center'>
                                                    <Button className='my-6 flex self-center items-center justify-center w-[50%] bg-blue-500 rounded-3xl' fullWidth>
                                                        <a href={`/doctor/${item.id}`} className=' text-center text-white ptm-p3 font-bold'>Detail</a>
                                                        </Button>
                                                </div>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </main>
        </Layout>
    )
}