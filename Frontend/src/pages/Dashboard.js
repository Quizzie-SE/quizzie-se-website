import React, {useState, useContext, useEffect} from "react";
import { Container, Typography, AppBar, Tabs, Tab, Snackbar } from "@material-ui/core";
import "./Dashboard.css";
import InfoContext from '../context/InfoContext';
import { Redirect } from "react-router";
import Loading from "./Loading";
import axios from "axios";
import '../components/ProfileSection';
import ProfileSection from "../components/ProfileSection";
import HistorySection from '../components/HistorySection';
import QuizzesSection from "../components/QuizzesSection";
import { Alert } from "@material-ui/lab";


function Dashboard(props) {
	const [tab, setTab] = useState(0);
	const [redirect, setRedirect] = useState(false);
	const [redirectOwner, setRedirectOwner] = useState(false);

	const [userType, setUserType] = useState(null);
	const [profile, setProfile] = useState({"userType":"User","isEmailVerified":true,"_id":"5f9e22911b1ace0017e4447e","googleId":"100590325271609520512","name":"Jugaldasdas","email":"jugalbhatt3@gmail.com","quizzesGiven":[{"responses":[{"description":"test-2","selected":"2","quesId":"5f9e23381b1ace0017e44487","correctAnswer":"2","options":[{"_id":"5f9e23381b1ace0017e44488","text":"1"},{"_id":"5f9e23381b1ace0017e44489","text":"2"},{"_id":"5f9e23381b1ace0017e4448a","text":"3"},{"_id":"5f9e23381b1ace0017e4448b","text":"4"}]},{"description":"Test-1","selected":"2","quesId":"5f9e23281b1ace0017e44482","correctAnswer":"1","options":[{"_id":"5f9e23281b1ace0017e44483","text":"1"},{"_id":"5f9e23281b1ace0017e44484","text":"2"},{"_id":"5f9e23281b1ace0017e44485","text":"3"},{"_id":"5f9e23281b1ace0017e44486","text":"4"}]}],"_id":"5f9e23f51b1ace0017e4448f","quizId":"5f9e23161b1ace0017e44480","marks":1,"timeEnded":1604199413600,"timeStarted":1604199404452}],"quizzesStarted":[{"_id":"5f9e23ea1b1ace0017e4448e","quizId":"5f9e23161b1ace0017e44480"}],"quizzesEnrolled":[{"_id":"5f9e23661b1ace0017e4448d","quizId":{"quizStatus":1,"quizRestart":0,"reminderSent":true,"_id":"5f9e23161b1ace0017e44480","quizName":"Test-project","adminId":{"userType":"Admin","isEmailVerified":true,"_id":"5f9e22fd1b1ace0017e4447f","googleId":100590325271609520000,"name":"Jugal Bhatt","email":"jugalbhatt3@gmail.com","quizzes":[{"_id":"5f9e23161b1ace0017e44481","quizId":"5f9e23161b1ace0017e44480"},{"_id":"607095d05d76450017b51d37","quizId":"607095cf5d76450017b51d36"}],"__v":0,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkFkbWluIiwidXNlcklkIjoiNWY5ZTIyZmQxYjFhY2UwMDE3ZTQ0NDdmIiwiZW1haWwiOiJqdWdhbGJoYXR0M0BnbWFpbC5jb20iLCJuYW1lIjoiSnVnYWwgQmhhdHQiLCJpc0VtYWlsVmVyaWZpZWQiOnRydWUsImlhdCI6MTYxNzk5MTA3NSwiZXhwIjoxNjE4MDc3NDc1fQ.A9IQ_rXVw0akz-DuLL8lrPa54t4Rbf5xUnFpOGrL97o"},"scheduledFor":"1604199175741","quizDuration":"15","quizType":"public","usersParticipated":[{"responses":[{"description":"test-2","selected":"2","quesId":"5f9e23381b1ace0017e44487","correctAnswer":"2","options":[{"_id":"5f9e23381b1ace0017e44488","text":"1"},{"_id":"5f9e23381b1ace0017e44489","text":"2"},{"_id":"5f9e23381b1ace0017e4448a","text":"3"},{"_id":"5f9e23381b1ace0017e4448b","text":"4"}]},{"description":"Test-1","selected":"2","quesId":"5f9e23281b1ace0017e44482","correctAnswer":"1","options":[{"_id":"5f9e23281b1ace0017e44483","text":"1"},{"_id":"5f9e23281b1ace0017e44484","text":"2"},{"_id":"5f9e23281b1ace0017e44485","text":"3"},{"_id":"5f9e23281b1ace0017e44486","text":"4"}]}],"_id":"5f9e23f51b1ace0017e44490","userId":"5f9e22911b1ace0017e4447e","marks":1,"timeEnded":1604199413600,"timeStarted":1604199404452}],"usersEnrolled":[{"_id":"5f9e23661b1ace0017e4448c","userId":"5f9e22911b1ace0017e4447e"}],"__v":0}}],"__v":0,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IlVzZXIiLCJ1c2VySWQiOiI1ZjllMjI5MTFiMWFjZTAwMTdlNDQ0N2UiLCJlbWFpbCI6Imp1Z2FsYmhhdHQzQGdtYWlsLmNvbSIsIm5hbWUiOiJKdWdhbCBCaGF0dCIsImlzRW1haWxWZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjE4MDUzMjYyLCJleHAiOjE2MTgxMzk2NjJ9.7JYXuvvV-GKF94KCEFgZSLYlzvxZb_hbE5y72B7rOQo"});
	const [loading, setLoading] = useState(false);

	const [refresh, setRefresh] = useState(false);

	const [blockSnack, setBlockSnack] = useState(false);
	const [timeUpSnack, setTimeUpSnack] = useState(false);
	const [emptySnack, setEmptySnack] = useState(false);

	const {isLoggedIn} = useContext(InfoContext);
	const handleTabChange = (e, newVal) => {
		setTab(newVal);
	}

	// const getProfile = async () => {
	// 	// setLoading(true);
	// 	uType = "user";
	// 	let url = "https://quizzie-api.herokuapp.com/general/checkUser";

	// 	let token = localStorage.getItem("authToken");

	// 	if(token === null) {
	// 		setRedirect(true);
	// 		return;
	// 	}

	// 	let uType = null;

	// 	try {
	// 		await axios.get(url, {
	// 			headers: {
	// 				"auth-token": token,
	// 			}
	// 		}).then(res => {
	// 			let type = res.data.result.userType;
	// 			if(type === "User")
	// 				uType = "user";
	// 			else if(type === "Admin")
	// 				uType = "admin";
	// 			else if(type === "Owner") {
	// 				uType = "owner";
	// 				setRedirectOwner(true);
	// 			}
				
	// 			setUserType(uType);
	// 		})
	// 	} catch(error) {
	// 		console.log(error);
	// 		localStorage.clear();
	// 		setRedirect(true);
	// 		return;
	// 	}

	// 	if(uType === "owner") return;

	// 	url = `https://quizzie-api.herokuapp.com/${uType}/`;
	// 	try {
	// 		await axios.get(url, {
	// 			headers: {
	// 				"auth-token": token,
	// 			}
	// 		}).then(res => {
	// 			setProfile(res.data.result1);
	// 			setLoading(false);
	// 		})
	// 	} catch(error) {
	// 		console.log(error);
	// 		localStorage.clear();
	// 		setRedirect(true);
	// 		return;
	// 	}
	// }

	// useEffect(() => {
	// 	if(!isLoggedIn) {
	// 		// setRedirect(false);
	// 		return;
	// 	} else {
	// 		getProfile();
	// 	}
	// }, [])

	// useEffect(() => {
	// 	if(refresh === true) {
	// 		getProfile();
	// 		setRefresh(false);
	// 	}
	// }, [refresh])

	// useEffect(() => {
	// 	if(Object.keys(props).length !== 0 && props.location.state !== undefined) {
	// 		if(props.location.state.blocked) {
	// 			setBlockSnack(true);
	// 		} else if(props.location.state.timeUp) {
	// 			setTimeUpSnack(true);
	// 		} else if(props.location.state.emptyQuiz) {
	// 			setEmptySnack(true);
	// 		}
	// 	}
	// }, [])

	useEffect(()=>{
	setProfile({"userType":"User","isEmailVerified":true,"_id":"5f9e22911b1ace0017e4447e","googleId":"100590325271609520512","name":"Jugal Bhatt","email":"jugalbhatt3@gmail.com","quizzesGiven":[{"responses":[{"description":"test-2","selected":"2","quesId":"5f9e23381b1ace0017e44487","correctAnswer":"2","options":[{"_id":"5f9e23381b1ace0017e44488","text":"1"},{"_id":"5f9e23381b1ace0017e44489","text":"2"},{"_id":"5f9e23381b1ace0017e4448a","text":"3"},{"_id":"5f9e23381b1ace0017e4448b","text":"4"}]},{"description":"Test-1","selected":"2","quesId":"5f9e23281b1ace0017e44482","correctAnswer":"1","options":[{"_id":"5f9e23281b1ace0017e44483","text":"1"},{"_id":"5f9e23281b1ace0017e44484","text":"2"},{"_id":"5f9e23281b1ace0017e44485","text":"3"},{"_id":"5f9e23281b1ace0017e44486","text":"4"}]}],"_id":"5f9e23f51b1ace0017e4448f","quizId":"5f9e23161b1ace0017e44480","marks":1,"timeEnded":1604199413600,"timeStarted":1604199404452}],"quizzesStarted":[{"_id":"5f9e23ea1b1ace0017e4448e","quizId":"5f9e23161b1ace0017e44480"}],"quizzesEnrolled":[{"_id":"5f9e23661b1ace0017e4448d","quizId":{"quizStatus":1,"quizRestart":0,"reminderSent":true,"_id":"5f9e23161b1ace0017e44480","quizName":"Test-project","adminId":{"userType":"Admin","isEmailVerified":true,"_id":"5f9e22fd1b1ace0017e4447f","googleId":100590325271609520000,"name":"Jugal Bhatt","email":"jugalbhatt3@gmail.com","quizzes":[{"_id":"5f9e23161b1ace0017e44481","quizId":"5f9e23161b1ace0017e44480"},{"_id":"607095d05d76450017b51d37","quizId":"607095cf5d76450017b51d36"}],"__v":0,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkFkbWluIiwidXNlcklkIjoiNWY5ZTIyZmQxYjFhY2UwMDE3ZTQ0NDdmIiwiZW1haWwiOiJqdWdhbGJoYXR0M0BnbWFpbC5jb20iLCJuYW1lIjoiSnVnYWwgQmhhdHQiLCJpc0VtYWlsVmVyaWZpZWQiOnRydWUsImlhdCI6MTYxNzk5MTA3NSwiZXhwIjoxNjE4MDc3NDc1fQ.A9IQ_rXVw0akz-DuLL8lrPa54t4Rbf5xUnFpOGrL97o"},"scheduledFor":"1604199175741","quizDuration":"15","quizType":"public","usersParticipated":[{"responses":[{"description":"test-2","selected":"2","quesId":"5f9e23381b1ace0017e44487","correctAnswer":"2","options":[{"_id":"5f9e23381b1ace0017e44488","text":"1"},{"_id":"5f9e23381b1ace0017e44489","text":"2"},{"_id":"5f9e23381b1ace0017e4448a","text":"3"},{"_id":"5f9e23381b1ace0017e4448b","text":"4"}]},{"description":"Test-1","selected":"2","quesId":"5f9e23281b1ace0017e44482","correctAnswer":"1","options":[{"_id":"5f9e23281b1ace0017e44483","text":"1"},{"_id":"5f9e23281b1ace0017e44484","text":"2"},{"_id":"5f9e23281b1ace0017e44485","text":"3"},{"_id":"5f9e23281b1ace0017e44486","text":"4"}]}],"_id":"5f9e23f51b1ace0017e44490","userId":"5f9e22911b1ace0017e4447e","marks":1,"timeEnded":1604199413600,"timeStarted":1604199404452}],"usersEnrolled":[{"_id":"5f9e23661b1ace0017e4448c","userId":"5f9e22911b1ace0017e4447e"}],"__v":0}}],"__v":0,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IlVzZXIiLCJ1c2VySWQiOiI1ZjllMjI5MTFiMWFjZTAwMTdlNDQ0N2UiLCJlbWFpbCI6Imp1Z2FsYmhhdHQzQGdtYWlsLmNvbSIsIm5hbWUiOiJKdWdhbCBCaGF0dCIsImlzRW1haWxWZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjE4MDUzMjYyLCJleHAiOjE2MTgxMzk2NjJ9.7JYXuvvV-GKF94KCEFgZSLYlzvxZb_hbE5y72B7rOQo"})

	},[])
	useEffect(()=>{
		const urlParams = new URLSearchParams(window.location.search);
		const myParam = urlParams.get('type');
			setUserType(myParam)
		},[])

	if(redirect) {
		return (
			<Redirect to="/" />
		)
	} else if(redirectOwner) {
		return <Redirect to="/coronilOP" />
	} else if(loading) {
		return (
			<Loading />
		)
	}
	else {
		return (
			<Container className="dashboard-page">
				<Typography variant="h4" className="dash-head">{userType === "user"? "Dashboard": "Organizer's Dashboard"}</Typography>
				<div className="dash-section">
					<AppBar position="static" color="default" className="bg-white tab-bar">
						<Tabs
							value={tab}
							onChange={handleTabChange}
							indicatorColor="primary"
							textColor="primary"
							variant="fullWidth"
							aria-label="full width tabs dashboard"
						>
							<Tab label="Quizzes" />
							<Tab label={userType === "admin"? "Your Quizzes": "History"} />
							<Tab label="Profile" />
						</Tabs>
					</AppBar>
					<TabPanel value={tab} index={0}>
						<QuizzesSection type={userType} profile={profile} refresh={setRefresh}/>
					</TabPanel>
					<TabPanel value={tab} index={1}>
						<HistorySection profile={profile} type={userType}/>
					</TabPanel>
					<TabPanel value={tab} index={2}>
						<ProfileSection profile={profile} type={userType}/>
					</TabPanel>
				</div>
				<Snackbar open={blockSnack} autoHideDuration={5000} onClose={() => setBlockSnack(false)}>
					<Alert variant="filled" severity="error" onClose={() => setBlockSnack(false)}>You violated the quiz rules!</Alert>
				</Snackbar>
				<Snackbar open={timeUpSnack} autoHideDuration={5000} onClose={() => setTimeUpSnack(false)}>
					<Alert variant="filled" severity="error" onClose={() => setTimeUpSnack(false)}>Time's Up! Your quiz was not submitted!</Alert>
				</Snackbar>
				<Snackbar open={emptySnack} autoHideDuration={5000} onClose={() => setEmptySnack(false)}>
					<Alert variant="filled" severity="error" onClose={() => setEmptySnack(false)}>There are no questions in the quiz.</Alert>
				</Snackbar>
			</Container>
		)
	}
}

function TabPanel(props) {
	return (
		<div
			role="tabpanel"
			hidden={props.value !== props.index}
			id={`simple-tabpanel-${props.index}`}
			aria-labelledby={`simple-tab-${props.index}`}
		>
			<div>{props.children}</div>
		</div>
	)
}

export default Dashboard;