import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import ConfirmationModal from '../components/ConfirmationModal';

const Dashboard: React.FC = () => {
    const { courses, deleteCourse } = useCourses();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editCourseId, setEditCourseId] = useState<number | null>(null);
    const [modalContent, setModalContent] = useState({
        title: '',
        message: '',
        onConfirm: () => { },
    });

    const handleDeleteCourse = (id: number) => {
        setModalContent({
            title: 'Delete Course',
            message: 'Are you sure you want to delete this course?',
            onConfirm: () => {
                deleteCourse(id);
                setShowDeleteModal(false);
            },
        });
        setShowDeleteModal(true);
    };

    const handleEditCourse = (id: number) => {
        setEditCourseId(id);
        setShowEditModal(true);
    };

    const confirmEdit = () => {
        navigate(`/edit-course/${editCourseId}`);
        setShowEditModal(false);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Course Dashboard</h1>
                <button onClick={() => navigate('/add-course')} className="btn btn-primary">Add Course</button>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {courses.map(course => (
                    <div key={course.id} className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Course Details</h5>
                                <div className="mb-3">
                                    <strong className="fw-normal">Name:</strong> {course.name}
                                </div>
                                <div className="mb-3">
                                    <strong className="fw-normal">Description:</strong> {course.description}
                                </div>
                                <div className="mb-3">
                                    <strong className="fw-normal">Instructor:</strong> {course.instructor}
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <button onClick={() => handleEditCourse(course.id)} className="btn btn-secondary">Edit</button>
                                <button onClick={() => handleDeleteCourse(course.id)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ConfirmationModal
                show={showDeleteModal}
                title={modalContent.title}
                message={modalContent.message}
                onConfirm={modalContent.onConfirm}
                onCancel={() => setShowDeleteModal(false)}
            />
            <ConfirmationModal
                show={showEditModal}
                title="Edit Course"
                message="Are you sure you want to edit this course?"
                onConfirm={confirmEdit}
                onCancel={() => setShowEditModal(false)}
            />
        </div>
    );
};

export default Dashboard;