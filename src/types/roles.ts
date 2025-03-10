export enum userRole {
  ADMIN = "Admin",
  FINANCE = "Finance",
  STAFF = "Staff",
  STUDENT = "Student",
}

export enum departmentUserRole {
  LECTURER = "Lecturer",
  LEADER = "Leader",
  STUDENT = "Student", //might use this later. not too sure
}

export enum userPrivilege {
  // Users
  CREATE_USERS = "can_create_users",
  READ_USERS = "can_read_users",
  UPDATE_USERS = "can_update_users",
  DELETE_USERS = "can_delete_users",

  // Roles
  CREATE_ROLES = "can_create_roles",
  READ_ROLES = "can_read_roles",
  UPDATE_ROLES = "can_update_roles",
  DELETE_ROLES = "can_delete_roles",

  // Departments
  CREATE_DEPARTMENTS = "can_create_departments",
  READ_DEPARTMENTS = "can_read_departments",
  UPDATE_DEPARTMENTS = "can_update_departments",
  DELETE_DEPARTMENTS = "can_delete_departments",

  // Courses
  CREATE_COURSES = "can_create_courses",
  READ_COURSES = "can_read_courses",
  UPDATE_COURSES = "can_update_courses",
  DELETE_COURSES = "can_delete_courses",

  // Lesson Rosters
  CREATE_LESSON_ROSTERS = "can_create_lesson_rosters",
  READ_LESSON_ROSTERS = "can_read_lesson_rosters",
  UPDATE_LESSON_ROSTERS = "can_update_lesson_rosters",
  DELETE_LESSON_ROSTERS = "can_delete_lesson_rosters",

  // Sessions (Every lesson or a course)
  CREATE_SESSIONS = "can_create_sessions",
  READ_SESSIONS = "can_read_sessions",
  UPDATE_SESSIONS = "can_update_sessions",
  DELETE_SESSIONS = "can_delete_sessions",
}
