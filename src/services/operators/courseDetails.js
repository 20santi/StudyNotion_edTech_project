import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { courseEndPoints } from "../apis";

const {
  SHOW_ALL_CATEGORY_API,
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  EDIT_SECTION_API,
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

export async function createSection(data, courseId, token) {
  const toastId = toast.loading("Loading...");
  var result = [];
  try {
    const response = await apiConnector(
      "POST",
      CREATE_SECTION_API,
      {
        sectionName: data,
        courseId: courseId,
      },
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

export async function createSubsection(data, sectionId, token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "POST",
      CREATE_SUBSECTION_API,
      {
        title: data.title,
        description: data.description,
        video: data.video,
        sectionId: sectionId,
      },
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CREATE_SUBSECTION_API response: ", response);
    result = response?.data?.data;
    console.log("Result------------------ ", result);
    toast.success("Subsection create successfully");
  } catch (error) {
    console.log("CREATE_SUBSECTION_API error: ", error);
    toast.error("Subsection could not create");
  }
  toast.dismiss(toastId);
  return result;
}
