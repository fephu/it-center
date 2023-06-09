import { Inter } from "next/font/google";


import './globals.css'
import ClientOnly from "./components/ClientOnly";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import getAllCategory from "./actions/getAllCategory";
import getCourseBySearch from "./actions/getCourseBySearch";
import ClassingModal from "./components/modals/ClassingModal";
import getAllCourses from "./actions/getAllCourses";
import getAllSchedule from "./actions/getAllSchedule";
import getAllLocation from "./actions/getAllLocation";


export const metadata = {
  title: 'Udemy',
  description: 'Generated by coderedoc',
}

const font = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  const categories = await getAllCategory();

  const courses = await getAllCourses();

  const schedule = await getAllSchedule();

  const location = await getAllLocation();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal categories={categories} />
          <RegisterModal />
          <LoginModal />
          <ClassingModal
            courses={courses}
            schedule={schedule}
            location={location}
          />
          <Navbar
            currentUser={currentUser}
            categories={categories}
          />
        </ClientOnly>
        <div className="pb-20 pt-20">
          {children}
        </div>
      </body>
    </html>
  )
}
