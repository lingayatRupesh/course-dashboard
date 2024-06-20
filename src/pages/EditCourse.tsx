import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { Course } from '../types';

const EditCourse: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { courses, updateCourse } = useCourses();
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | undefined>(undefined);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [instructor, setInstructor] = useState('');

    useEffect(() => {
        const courseToEdit = courses.find(course => course.id === parseInt(id!, 10));
        if (courseToEdit) {
            setCourse(courseToEdit);
            setName(courseToEdit.name);
            setDescription(courseToEdit.description);
            setInstructor(courseToEdit.instructor);
        }
    }, [id, courses]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (course) {
            updateCourse({ ...course, name, description, instructor });
            navigate('/');
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    if (!course) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Edit Course</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Course Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        id="description"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="instructor" className="form-label">Instructor</label>
                                    <input
                                        type="text"
                                        id="instructor"
                                        className="form-control"
                                        value={instructor}
                                        onChange={(e) => setInstructor(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                                    <button type="submit" className="btn btn-primary">Update Course</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCourse;