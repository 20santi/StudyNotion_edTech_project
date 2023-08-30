import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndPoints } from "../apis";

const {
  SHOW_ALL_CATEGORY_API,
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  EDIT_SECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  EDIT_SUBSECTION_API,
  EDIT_COURSE_API,
  FETCH_ALL_COURSES,
  FETCH_COURSE_DETAILS_API,
  //DELETE_COURSE_API
} = courseEndPoints;

export async function showAllCategory() {
  const toastId = toast.loading("Loading...");
  var data = [];
  try {
    const response = await apiConnector("GET", SHOW_ALL_CATEGORY_API);
    console.log("SHOW_ALL_CATEGORY_API response: ", response);

    toast.success("fetch category details successfully");
    data = response.data.data;
  } catch (error) {
    console.log("SHOW_ALL_CATEGORY_API error: ", error);
    toast.error("Could not fetch categories");
  }
  toast.dismiss(toastId);
  return data;
}

export async function createCourse(data, token) {
  const toastId = toast.loading("Loading");
  var result = null;
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_COURSE_API response: ", response);
    toast.success("Course Created Successfully");
    result = response;
  } catch (error) {
    toast.error("Course could not create");
    console.log("CREATE_COURSE_API error: ", error);
  }
  toast.dismiss(toastId);
  return result;
}

export async function updateCourse(formData, token) {
  const toastId = toast.loading("Loading...");
  var result = [];
  try {
    const response = await apiConnector(
      "POST",
      EDIT_COURSE_API,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("EDIT_COURSE_API response: ", response);
    result = response;
    toast.success("Course edit successfully");
  } catch (error) {
    console.log("EDIT_COURSE_API error: ", error);
    toast.error("Course could not edit");
  }
  toast.dismiss(toastId);
  return result;
}

export async function fetchCourseDetails(courseID, token) {
  const toastId = toast.loading("Loading...");
  var result = null;
  try {
    const response = await apiConnector("POST", FETCH_COURSE_DETAILS_API, {courseID}, {
      Authorization: `Bearer ${token}`
    })
    console.log("FETCH_COURSE_DETAILS_API response: ", response);
    result = response?.data?.data;
    toast.success("Fetch course details successfully");
  } catch(error) {
    console.log("FETCH_COURSE_DETAILS_API error: ", error);
    toast.error("Course details could not fetch");
  }
  toast.dismiss(toastId);
  return result;
}

// export async function deleteCourse(courseId, token) {
//   const toastId = toast.loading("Loading...");
//   try {
//     const response = await apiConnector("POST", DELETE_COURSE_API, {courseId}, {
//       Authorization: `Bearer ${token}`
//     })
//     console.log("DELETE_COURSE_API response: ", response);
//     result = response?.data?.data;
//     toast.success("Course deleted successfully");
//   } catch(error) {
//     console.log("DELETE_COURSE_API error: ", error);
//     toast.error("Course could not delete");
//   }
//   toast.dismiss(toastId);
// }

export async function getAllCourses(token) {
  const toastId = toast.loading("Loading...");
  var data = [];
  try {
    const response = await apiConnector("GET", FETCH_ALL_COURSES, null, {
      Authorization: `Bearer ${token}`
    });
    console.log("FETCH_ALL_COURSES response: ", response);

    toast.success("fetch courses successfully");
    data = response.data.data;
  } catch (error) {
    console.log("FETCH_ALL_COURSES error: ", error);
    toast.error("Could not fetch Courses");
  }
  toast.dismiss(toastId);
  return data;
}

export async function createSection(data, token) {
  const toastId = toast.loading("Loading...");
  var result = [];
  try {
    const response = await apiConnector(
      "POST",
      CREATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CREATE_SECTION_API response: ", response);
    result = response?.data?.course;
    toast.success("Section created successfully");
  } catch (error) {
    console.log("CREATE_SECTION_API error: ", error);
    toast.error("Section could not create");
  }
  toast.dismiss(toastId);
  return result;
}

export async function editSection(sectionId, sectionName, token) {
  const toastId = toast.loading("Loading...");
  var result = [];
  try {
    const response = await apiConnector(
      "PUT",
      EDIT_SECTION_API,
      {
        sectionId: sectionId,
        sectionName: sectionName,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("EDIT_SECTION_API response: ", response);
    result = response;
    toast.success("Section edit successfully");
  } catch (error) {
    console.log("EDIT_SECTION_API error: ", error);
    toast.error("Section could not edit");
  }
  toast.dismiss(toastId);
  return result;
}

export async function deleteSection(data, token) {
  const toastId = toast.loading("Loading...");
  var result = [];
  try {
    const response = await apiConnector(
      "POST",
      DELETE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("DELETE_SECTION_API response: ", response);
    result = response;
    toast.success("Section deleted successfully");
  } catch (error) {
    console.log("DELETE_SECTION_API error: ", error);
    toast.error("Section could not delete");
  }
  toast.dismiss(toastId);
  return result;
}

export async function createSubsection(formData, token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "POST",
      CREATE_SUBSECTION_API,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CREATE_SUBSECTION_API response: ", response);
    result = response?.data?.data;
    toast.success("Subsection create successfully");
  } catch (error) {
    console.log("CREATE_SUBSECTION_API error: ", error);
    toast.error("Subsection could not create");
  }
  toast.dismiss(toastId);
  return result;
}

export async function editSubsection(formData, token) {
  const toastId = toast.loading("Loading...");
  var result = [];
  try {
    const response = await apiConnector(
      "POST",
      EDIT_SUBSECTION_API,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("EDIT_SUBSECTION_API response: ", response);
    result = response;
    toast.success("Subsection edit successfully");
  } catch (error) {
    console.log("EDIT_SUBSECTION_API error: ", error);
    toast.error("Subsection could not edit");
  }
  toast.dismiss(toastId);
  return result;
}

export async function deleteSubection(data, token) {
  const toastId = toast.loading("Loading...");
  var result = [];
  try {
    const response = await apiConnector(
      "POST",
      DELETE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("DELETE_SUBSECTION_API response: ", response);
    result = response;
    toast.success("Subsection deleted successfully");
  } catch (error) {
    console.log("DELETE_SUBSECTION_API error: ", error);
    toast.error("Subsection could not delete");
  }
  toast.dismiss(toastId);
  return result;
}