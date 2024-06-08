import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../redux/actions/courseActions';
import { fetchCourseModules } from '../redux/actions/courseModuleActions';
import { fetchLessons } from '../redux/actions/lessonActions';

const LessonList = () => {
  const dispatch = useDispatch();
  const {
    categoryId,
    courseId,
  } = useParams();
  const lessons = useSelector((state) => state.lesson.lessons);
  const modules = useSelector((state) => state.module.modules);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    dispatch(fetchCourses());
    if (categoryId && courseId) {
      dispatch(fetchCourseModules(categoryId, courseId));
    }
  }, [dispatch, categoryId, courseId]);

  const toggleLessons = (moduleId, e) => {
    e.preventDefault();
    console.log('Toggling lessons for module ID:', moduleId);

    if (!expandedModules[moduleId]) {
      dispatch(fetchLessons(categoryId, courseId, moduleId));
    }

    setExpandedModules((prevExpandedModules) => ({
      ...prevExpandedModules,
      [moduleId]: !prevExpandedModules[moduleId],
    }));
  };

  const courseModulesArray = Array.isArray(modules)
    ? modules.filter((module) => module.course_id === parseInt(courseId, 10))
    : [];

  return (
    <div className="lesson-list">
      <ul className="modules-ul-lp">
        {courseModulesArray.map((module) => (
          <li className="modules-list" key={module.id}>
            <button type="button" className="course-modules-list-lp" onClick={(e) => toggleLessons(module.id, e)}>
              <div className="modules-btn-prt1">
                <h4 className="module-title-h4">{module.title}</h4>
              </div>
              <div className="modules-expand-lessons modules-btn-prt2">
                <p className="account-down-text-lp">
                  {expandedModules[module.id] ? '-' : '+'}
                </p>
              </div>
            </button>
            {expandedModules[module.id] && (
              <div>
                {lessons
                  .filter((lesson) => lesson.course_module_id === module.id)
                  .map((lesson) => (
                    <div key={lesson.id} className="lesson-item">
                      <Link className="lesson-route" to={`/categories/${categoryId}/courses/${courseId}/modules/${module.id}/lessons/${lesson.id}`}>
                        {lesson.title}
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;
