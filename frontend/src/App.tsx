import './App.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import TaskModal from './components/TaskModal';
import API from './services/api';
import type { Task } from './types/TaskProps';
import type { User } from './types/UserProps';


function App() {
  type Filter = 'all' | 'important' | 'active' | 'completed';
  const [filter, setFilter] = useState<Filter>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeButtonsTaskId, setActiveButtonsTaskId] = useState<string | null>(null);


  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };


  const totalCount = tasks.length;
  const activeCount = tasks.filter((task) => !task.completed).length;

  const fetchTasks = async (retry = 0) => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      if (retry < 3) {
        console.warn(`Повторна спроба ${retry + 1} через 2с...`);
        setTimeout(() => fetchTasks(retry + 1), 2000);
      } else {
        console.error('Не вдалося завантажити завдання:', error);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (task: Task) => {
    await API.put(`/tasks/${task._id}`, { completed: !task.completed });
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'important') return task.isPriority;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
  });

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit' });
  };


  const isDueSoon = (dueDate?: string) => {
    if (!dueDate) return false;
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 2 && diffDays >= 0;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const groupTasksByDate = (tasks: Task[]) => {
    const groups: Record<string, Task[]> = {};

    tasks.forEach((task) => {
      const createdDate = new Date(task.createdAt).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      if (!groups[createdDate]) {
        groups[createdDate] = [];
      }

      groups[createdDate].push(task);
    });

    return groups;
  };

  const lastTaskRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (lastTaskRef.current) {
      lastTaskRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [filteredTasks]);


  return (
    <>
      <Header
        onOpenModal={() => setModalOpen(true)}
        totalCount={totalCount}
        activeCount={activeCount}
      />
      <div className="wrapper">
        {user && (
          <TaskModal
            isOpen={modalOpen || editingTask !== null}
            onClose={() => {
              setModalOpen(false);
              setEditingTask(null);
            }}
            initialData={
              editingTask
                ? {
                  ...editingTask,
                  quantity: editingTask.quantity ? Number(editingTask.quantity) : undefined,
                }
                : undefined
            }
            onSubmit={async (taskData) => {
              if (editingTask) {
                await API.put(`/tasks/${editingTask._id}`, taskData);
              } else {
                await API.post('/tasks', taskData);
              }
              fetchTasks();
              setEditingTask(null);
              setModalOpen(false);
            }}
            user={user}
          />
        )}
        <main>
          <div className="filter">
            <div className="filter-wrapper">
              <span>Показати:</span>
              <div className="btn-wrapper">
                <button onClick={() => setFilter('all')} className={`filter-btn${filter === 'all' ? 'active' : ''}`}>Усі</button>
                <button onClick={() => setFilter('active')} className={`filter-btn${filter === 'active' ? 'active' : ''}`}>Активні</button>
                <button onClick={() => setFilter('important')} className={`filter-btn${filter === 'important' ? 'active' : ''}`}>Важливі</button>
                <button onClick={() => setFilter('completed')} className={`filter-btn${filter === 'completed' ? 'active' : ''}`}>Завершені</button>
              </div>
            </div>
          </div>
          <div className="task-wrapper">
            <ul className="tasks">
              {Object.entries(groupTasksByDate(filteredTasks))
                .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
                .map(([date, tasksForDate], index, array) => {
                  const isLastGroup = index === array.length - 1;

                  return (
                    <React.Fragment key={date}>
                      <li
                        className="date-separator"
                        ref={isLastGroup ? lastTaskRef : null}
                      >
                        <span className="date-group">
                          {date}
                        </span>
                      </li>

                      {tasksForDate.map((task) => {
                        const showDueDate = formatDate(task.dueDate);
                        const dueSoon = isDueSoon(task.dueDate);
                        const isImportant = task.isPriority;
                        const classes = ['task-item'];
                        if (dueSoon) classes.push('due-soon');
                        if (isImportant) classes.push('important');
                        const titleClass = ['task-title'];
                        if (dueSoon) titleClass.push('soon');
                        if (isImportant) titleClass.push('titleI');

                        return (
                          <li
                            key={task._id}
                            onClick={() => toggleExpand(task._id)}
                            className={classes.join(' ')}
                            style={{
                              height: expandedId === task._id ? '120px' : '50px',
                              overflow: 'hidden',
                              transition: 'height 0.3s ease',
                            }}
                          >

                            <div
                              className={titleClass.join(' ')}
                              onClick={() => {
                                if (activeButtonsTaskId === task._id) {
                                  setActiveButtonsTaskId(null);
                                } else {
                                  setActiveButtonsTaskId(task._id);
                                }
                              }}
                              style={{
                                fontWeight: isImportant ? 'bold' : 'normal',
                              }}
                            >
                              {task.isPriority &&
                                <div className="title-icon"
                                >
                                  <i className="fa-solid fa-fire" style={{ color: 'var(--red-1)' }}></i>
                                </div>
                              }
                              {showDueDate &&
                                <div className="title-icon">
                                  <i className="fa-solid fa-clock" style={{ color: 'var(--link-hover)' }}></i>
                                </div>
                              }
                              <div style={{ flex: 1 }}>
                                <div style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                  {task.title}
                                  {task.quantity && (
                                    <span style={{ marginLeft: '6px' }}>(x{task.quantity})</span>
                                  )}
                                </div>
                              </div>

                              <div
                                className={`task-item-btn ${activeButtonsTaskId === task._id ? 'visible' : ''}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button onClick={(e) => { e.stopPropagation(); toggleComplete(task); }}>
                                  {task.completed ? (
                                    <i className="fa-solid fa-rotate-left"></i>
                                  ) : (
                                    <i className="fa-solid fa-square-check"></i>
                                  )}
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); setEditingTask(task); }}>
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(task._id); }}>
                                  <i className="fa-solid fa-rectangle-xmark"></i>
                                </button>
                              </div>
                            </div>
                            {
                              expandedId === task._id && (
                                <div className="task-body">
                                  {task.description && <p>{task.description}</p>}
                                  <div className="task-icon">
                                    {showDueDate && <i className="fa-solid fa-clock"> {showDueDate}</i>}
                                  </div>
                                </div>
                              )
                            }
                          </li>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
            </ul>


          </div>
        </main >
      </div >
    </>
  )
}

export default App;
