import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course } from '../types';

interface CourseContextType {
    courses: Course[];
    addCourse: (course: Course) => void;
    updateCourse: (updatedCourse: Course) => void;
    deleteCourse: (id: number) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [courses, setCourses] = useState<Course[]>([]);

    const addCourse = (course: Course) => {
        setCourses(prevCourses => [...prevCourses, course]);
    };

    const updateCourse = (updatedCourse: Course) => {
        setCourses(prevCourses =>
            prevCourses.map(course =>
                course.id === updatedCourse.id ? updatedCourse : course
            )
        );
    };

    const deleteCourse = (id: number) => {
        setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
    };

    return (
        <CourseContext.Provider value={{ courses, addCourse, updateCourse, deleteCourse }}>
            {children}
        </CourseContext.Provider>
    );
};

export const useCourses = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error('useCourses must be used within a CourseProvider');
    }
    return context;
};