export const statusOptions = [
  {
    id: '3c6f039a-c2d6-4cbb-9d3d-56a5fbe77e42',
    label: 'Completed',
    color: 'bg-green-100 text-green-800',
  },
  {
    id: '88bb4602-ea65-4061-b126-d680ed79e4d6',
    label: 'Pending',
    color: 'bg-blue-100 text-blue-800',
  },
];

// const handleSaveTask = async (e) => { // e.preventDefault(); // if (!isFormValid) { // toast.error("Please fill in all required fields."); // return; // } // try { // const response = await addTask(formData); // if (response[0].DDId) { // toast.success("Task Added"); // setFormData({ // deptId: "", // projectId: "", // statusId: "", // task: "", // remarks: "", // startDateTime: "", // endDateTime: "", // }); // } // setFormData({ // deptId: "", // projectId: "", // statusId: "", // task: "", // remarks: "", // startDateTime: "", // endDateTime: "", // }); // setOpen(false); // toast.success("Task Added Successfully!"); // } catch (err) { // console.log(err); // toast.error(errors || "Something went wrong."); // } // };

// const handleSaveTask = async (e) => {
//   e.preventDefault();

//   if (!isFormValid) {
//     toast.error("Please fill in all required fields.");
//     return;
//   }

//   if (
//     formData.startDateTime &&
//     formData.endDateTime &&
//     new Date(formData.endDateTime) < new Date(formData.startDateTime)
//   ) {
//     toast.error("End time cannot be before start time.");
//     return;
//   }

//   try {
//     const payload = {
//       ...formData,
//       callDateTime: formData.startDateTime?.toISOString() || null,
//     };

//     await addTask(payload);

//     setFormData({
//       deptId: "",
//       projectId: "",
//       statusId: "",
//       task: "",
//       remarks: "",
//       startDateTime: null,
//       endDateTime: null,
//       pointGivenUserId: user?.UserId,
//       insertedByUserId: user?.UserId,
//       targetDate: new Date().toISOString(),
//     });

//     toast.success("Task Added Successfully!");
//     setOpen(false);
//   } catch (err) {
//     console.log(err);
//     toast.error(errors || "Something went wrong.");
//   }
// };
