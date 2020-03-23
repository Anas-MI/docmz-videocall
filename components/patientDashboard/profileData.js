import React, { Component } from "react"
import { Tabs } from "antd"
import { StickyContainer, Sticky } from "react-sticky"
import { Table, Tag } from "antd"
import { display } from "react-icons-kit/icomoon"

const columns = [
	{
		title: "Doctor",
		dataIndex: "doctor",
		key: "doctor",
		render: doctor => (
			<div className="c-profileData__doctorProfile">
				<div className="c-profileData__doctorAvatar">
					<a href="#">
						<img src={doctor[0]} alt="" className="img-fluid" />
					</a>
				</div>
				<div className="c-profileData__doctorDetails">
					<h3>
						<a>{doctor[1]}</a>
					</h3>
					<h5>{doctor[2]}</h5>
				</div>
			</div>
		)
	},
	{
		title: "Appt Date",
		dataIndex: "apptDate",
		key: "apptDate"
	},
	{
		title: "Booking Date",
		dataIndex: "bookingDate",
		key: "bookingDate"
	},
	{
		title: "Amount",
		dataIndex: "amount",
		key: "amount"
	},
	{
		title: "Status",
		key: "status",
		dataIndex: "status",
		render: status => (
			<span>
				{status.map(tag => {
					let color = "geekblue"
					if ((status = "cancelled")) {
						color = "volcano"
					} else if ((status = "confirm")) {
						color = "green"
					} else if ((status = "pending")) {
						color = "geekblue"
					}
					return <Tag color={color}>{tag.toUpperCase()}</Tag>
				})}
			</span>
		)
	},
	{
		title: "Action",
		key: "action",
		render: (text, record) => (
			<span>
				<a style={{ marginRight: 16 }}>Invite {record.name}</a>
				<a>Delete</a>
			</span>
		)
	}
]

const Prescriptioncolumns = [
	{
		title: "Date",
		dataIndex: "date",
		key: "date"
	},
	{
		title: "Name",
		dataIndex: "presName",
		key: "pres-Name"
	},
	{
		title: "Created by",
		dataIndex: "doctor",
		key: "doctor",
		render: doctor => (
			<div className="c-profileData__doctorProfile">
				<div className="c-profileData__doctorAvatar">
					<a href="#">
						<img src={doctor[0]} alt="" className="img-fluid" />
					</a>
				</div>
				<div className="c-profileData__doctorDetails">
					<h3>
						<a>{doctor[1]}</a>
					</h3>
					<h5>{doctor[2]}</h5>
				</div>
			</div>
		)
	},
	{
		title: " ",
		key: "receipt",
		dataIndex: "receipt",
		render: receipt => (
			<span style={{ display: "flex" }}>
				<Tag color="blue">{receipt[0]}</Tag>
				<Tag color="blue">{receipt[1]}</Tag>
			</span>
		)
	}
]

const medical = [
	{
		title: "ID",
		dataIndex: "id",
		key: "id"
	},
	{
		title: "Date",
		dataIndex: "date",
		key: "date"
	},
	{
		title: "Description",
		dataIndex: "description",
		key: "description"
	},
	{
		title: "Attachment",
		dataIndex: "attachment",
		key: "attachment"
	},
	{
		title: "Created",
		dataIndex: "doctor",
		key: "doctor",
		render: doctor => (
			<div className="c-profileData__doctorProfile">
				<div className="c-profileData__doctorAvatar">
					<a href="#">
						<img src={doctor[0]} alt="" className="img-fluid" />
					</a>
				</div>
				<div className="c-profileData__doctorDetails">
					<h3>
						<a>{doctor[1]}</a>
					</h3>
					<h5>{doctor[2]}</h5>
				</div>
			</div>
		)
	}
]

const billing = [
	{
		title: "Invoice No",
		dataIndex: "invoiceno",
		key: "invoiceno"
	},
	{
		title: "Doctor",
		dataIndex: "doctor",
		key: "doctor",
		render: doctor => (
			<div className="c-profileData__doctorProfile">
				<div className="c-profileData__doctorAvatar">
					<a href="#">
						<img src={doctor[0]} alt="" className="img-fluid" />
					</a>
				</div>
				<div className="c-profileData__doctorDetails">
					<h3>
						<a>{doctor[1]}</a>
					</h3>
					<h5>{doctor[2]}</h5>
				</div>
			</div>
		)
	},
	{
		title: "Amount",
		dataIndex: "amount",
		key: "amount"
	},
	{
		title: "Paid On",
		dataIndex: "paidon",
		key: "paidon"
	},
	{
		title: " ",
		key: "receipt",
		dataIndex: "receipt",
		render: receipt => (
			<span style={{ display: "flex" }}>
				<Tag color="blue">{receipt[0]}</Tag>
				<Tag color="blue">{receipt[1]}</Tag>
			</span>
		)
	}
]

const data = [
	{
		key: "1",
		doctor: ["/images/doctorthumb.jpg", "john doe", "doctor"],
		apptDate: 32,
		bookingDate: "New York No. 1 Lake Park",
		amount: 160,
		status: ["pending"],
		date: "03/03/2020",
		presName: "Prescription1",
		receipt: ["Print", "view"],
		id: "#MR-0010",
		description: "Dental Filling",
		attachment: "dental-test.pdf",
		invoiceno: "#INV-0010",
		amount: "$450",
		paidon: "14 Nov 2019"
	},
	{
		key: "2",
		doctor: ["/images/doctorthumb.jpg", "anna doe", "doctor"],
		apptDate: 42,
		bookingDate: "London No. 1 Lake Park",
		amount: 160,
		status: ["cancelled"],
		date: "03/03/2020",
		presName: "Prescription1",
		receipt: ["Print", "view"],
		id: "#MR-0009",
		description: "Teeth Cleaning",
		attachment: "cardio-test.pdf",
		invoiceno: "INV-0009",
		amount: "$300",
		paidon: "13 Nov 2019"
	},
	{
		key: "3",
		doctor: ["/images/doctorthumb.jpg", "tom jobs", "doctor"],
		apptDate: 32,
		bookingDate: "Sidney No. 1 Lake Park",
		amount: 160,
		status: ["confirm"],
		date: "03/03/2020",
		presName: "Prescription1",
		receipt: ["Print", "view"],
		id: "#MR-0008",
		description: "General Checkup",
		attachment: "eye-test.pdf",
		invoiceno: "#INV-0007",
		amount: "$150",
		paidon: "12 Nov 2019"
	}
]

const { TabPane } = Tabs

const renderTabBar = (props, DefaultTabBar) => (
	<Sticky bottomOffset={80}>
		{({ style }) => (
			<DefaultTabBar
				{...props}
				className="site-custom-tab-bar"
				style={{ ...style }}
			/>
		)}
	</Sticky>
)

class ProfileData extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<React.Fragment>
				<div className="c-profileData__wrapper">
					<StickyContainer>
						<Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
							<TabPane tab="Appointments" key="1">
								<div className="c-profileData__appointmentsWrapper">
									<div className="c-profileData__appointmentsTable">
										<div className="table-responsive">
											<Table columns={columns} dataSource={data} />
										</div>
									</div>
								</div>
							</TabPane>
							<TabPane tab="Prescriptions" key="2">
								<button>Add Prescription</button>
								<div className="c-profileData__appointmentsWrapper">
									<div className="c-profileData__appointmentsTable">
										<div className="table-responsive">
											<Table columns={Prescriptioncolumns} dataSource={data} />
										</div>
									</div>
								</div>
							</TabPane>
							<TabPane tab="Medical Records" key="3">
								<button>Add Medical Records</button>
								<div className="c-profileData__appointmentsWrapper">
									<div className="c-profileData__appointmentsTable">
										<div className="table-responsive">
											<Table columns={medical} dataSource={data} />
										</div>
									</div>
								</div>
							</TabPane>
							<TabPane tab="Billing" key="4">
								<button>Add Billing</button>
								<div className="c-profileData__appointmentsWrapper">
									<div className="c-profileData__appointmentsTable">
										<div className="table-responsive">
											<Table columns={billing} dataSource={data} />
										</div>
									</div>
								</div>
							</TabPane>
						</Tabs>
					</StickyContainer>
				</div>
			</React.Fragment>
		)
	}
}

export default ProfileData
