import React from 'react'
import AddNewBtn from '../addNew/AddNewBtn'
import Nav from '../Navigation/Nav'
import SideBar from '../sidebar/SideBar'
import TaskList from '../taskList/TaskList'

const Home = () => {
    return (
        <body className="text-[#111827]">
            <div className="container relative">
                <SideBar />
                <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
                    <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                        <AddNewBtn />

                        <TaskList />
                    </main>
                </div>
            </div>
        </body>
    )
}

export default Home