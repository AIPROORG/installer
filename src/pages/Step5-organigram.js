import React, { useRef, useEffect, useState } from "react";
import OrgChart from "@balkangraph/orgchart.js";
import axios from "axios";
import storageComunicator from "../utils/storageComunication";
import { endpoints } from "../utils/endpoints";

const Chart = () => {
  const divRef = useRef(null);
  let chart;
  const [redrawChart, setRedrawChart] = useState(false);

  let deps = [];
  let ceo = {};
  let employees = [];

  const fetchOrganigramInfo = async () => {
    console.log("fetching organigram info");
    try {
      await axios
        .get(endpoints.company.get_organigram_info, {
          headers: {
            Authorization: `Bearer ${
              storageComunicator.authToken.get().access
            }`,
          },
        })
        .then((res) => {
          console.log("laksjhflkajsdhfljkahdflajkhsdlfjhasdlfjh", res.data);
          deps = res.data.departments;
          ceo = res.data.ceo;
          employees = res.data.employees;
        });
    } catch (error) {
      console.error("Error fetching organigram info:", error);
    }
  };
  const getLastId = () => {
    let rez = -1;
    if (chart.nodes === null) {
      return 0;
    } else if (chart.nodes) {
      for (let x in chart.nodes) {
        if (!isNaN(x)) {
          if (parseInt(x) > rez) {
            rez = parseInt(x);
          }
        }
      }
    }
    return rez + 1;
  };
  const isIdinChart = (id) => {
    for (const x in chart.nodes) {
      if (x.id === id) {
        return true;
      }
    }
    return false;
  };
  const addNewNodeForm = (e) => {
    e.preventDefault();
    let emails = document.getElementById("txtArea");
    let delimiters = /,|\n|\t|\s|;/;
    let email_list = emails.value.split(delimiters);
    let count = 0;

    for (const email of email_list) {
      count += 1;
      if (email !== "") {
        let id = getLastId();
        if (!isIdinChart(id)) {
          let data = {
            id: id,
            name: "",
            stpid: "unasigned",
            title: email,
            img: "",
            email: email,
            tags: ["unasigned-node-card-style"],
            button: "Import from Google",
          };

          chart.addNode(data);
        }
      }
    }
    emails.value = "";
  };
  const drawChart = async () => {
    let nodes = [];
    let data_ceo = {
      id: 1,
      name: ceo.first_name + " " + ceo.last_name,
      stpid: "organigram",
      title: "CEO",
      img: ceo.picture,
      email: ceo.email,
      tags: ["big-boss"],
      button: " ",
    };
    nodes.push(data_ceo);
    for (const x of deps) {
      if (x.name === "unasigned") {
        let data_dep = {
          id: x.name,
          name: x.name,
          title: x.name,
          img: "",
          email: x.name,
          tags: ["unasigned"],
          button: " ",
          dep_id: x.id,
        };
        nodes.push(data_dep);
      } else {
        let data_dep = {
          id: x.name,
          name: x.name,
          pid: 1,
          title: x.name,
          img: "",
          email: x.name,
          tags: ["department", "security"],
          button: " ",
          dep_id: x.id,
        };
        nodes.push(data_dep);
      }
    }
    for (const x of employees) {
      let data_emp = {
        id: x.id + 1000,
        name: x.first_name + " " + x.last_name,
        title: x.first_name + " " + x.last_name,
        img: x.picture,
        email: x.email,
        pid: parseInt(x.supervizer_id) + 1000,
        tags:
          x.department_name === "unasigned"
            ? ["unasigned-google-node-card-style"]
            : ["asigned-node-card-style"],
        button: " ",
        dep_id: x.department_id,
      };

      if (!isNaN(parseInt(x.supervizer_id) + 1000)) {
        data_emp.pid = parseInt(x.supervizer_id) + 1000;
        data_emp.stpd = null;
      } else {
        data_emp.stpid = x.department_name;
      }
      nodes.push(data_emp);
    }
    return nodes;
  };
  const breakHiererchy = (sender, nodeId, dep_id) => {
    let node = sender.get(nodeId);
    console.log(sender.get(nodeId));
    for (const child of sender.getNode(nodeId).children) {
      breakHiererchy(sender, child.id, dep_id);
    }
    set_node_info(node.id, dep_id, null);
  };
  const initializeChart = async () => {
    // let users = localStorage.getItem("listUsers");
    console.log("initialize chart");
    await fetchOrganigramInfo();
    chart = new OrgChart(divRef.current, {
      nodes: [
        {
          id: "organigram",
          tags: ["organigram"],
          name: "Organigram",
          movex: 0,
          movey: 0,
          button: " ",
        },
      ],
      enableSearch: false,
      enablePan: true,
      scaleInitial: 0.6,
      enableDragDrop: true,
      roots: ["unasigned", "organigram"],
      template: "deborah",
      sticky: false,
      nodeMouseClick: OrgChart.action.details,
      toolbar: {
        fullScreen: true,
        zoom: true,
        fit: true,
        expandAll: true,
      },
      editForm: {
        generateElementsFromFields: false,
        elements: [
          { type: "textbox", label: "Full Name", binding: "name" },
          { type: "textbox", label: "Title", binding: "title" },
          {
            type: "textbox",
            label: "Photo Url",
            binding: "img",
            btn: "Upload",
          },
          { type: "textbox", label: "Email", binding: "email" },
        ],
        buttons: {
          edit: {
            icon: OrgChart.icon.edit(24, 24, "#fff"),
            text: "Edit",
            hideIfEditMode: true,
            hideIfDetailsMode: false,
          },
          share: {
            icon: OrgChart.icon.share(24, 24, "#fff"),
            text: "Share",
          },
          pdf: {
            icon: OrgChart.icon.pdf(24, 24, "#fff"),
            text: "Save as PDF",
          },
          remove: {
            icon: OrgChart.icon.remove(24, 24, "#fff"),
            text: "Remove",
            hideIfDetailsMode: true,
          },
        },
      },
      nodeBinding: {
        img_0: "img",
        field_0: "name",
        img_1: "img2",
        field_1: "title",
        field_2: "email",
        field_3: "button",
        field_4: "dep_id",
      },
      tags: {
        unasigned: {
          template: "customGroupUnasigned",
          subTreeConfig: {
            siblingSeparation: 15,
            template: "ana",
            columns: 3,
          },
        },
        organigram: {
          template: "invisibleGroup",
          subTreeConfig: {
            siblingSeparation: 10,
            // align: OrgChart.align.orientation,
            // orientation: OrgChart.orientation.top_left,
          },
        },
        department: {
          template: "group",
        },
        "unasigned-google-node-card-style": {
          template: "oliviaCustom2",
        },
        "unasigned-node-card-style": {
          template: "oliviaCustom",
        },
        "asigned-node-card-style": {
          template: "olivia",
        },
        "big-boss": {
          template: "olivia",
        },
        "sd-employee": {
          template: "olivia",
        },
        management: {
          subTreeConfig: {
            siblingSeparation: 2,
          },
        },
        security: {
          subTreeConfig: {
            siblingSeparation: 2,
          },
        },
        it: {
          subTreeConfig: {
            siblingSeparation: 2,
          },
        },
        sales: {
          subTreeConfig: {
            siblingSeparation: 2,
          },
        },
      },
    });
    let nods = await drawChart();
    for (const x in nods) {
      chart.add(nods[x]);
    }

    OrgChart.templates.customGroupUnasigned = Object.assign(
      {},
      OrgChart.templates.ana
    );
    OrgChart.templates.oliviaCustom = Object.assign(
      {},
      OrgChart.templates.olivia
    );
    OrgChart.templates.oliviaCustom.node =
      '<rect fill="#039BE5" x="0" y="0" height="{h}" width="{w}" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';
    OrgChart.templates.oliviaCustom2 = Object.assign(
      {},
      OrgChart.templates.olivia
    );
    OrgChart.templates.oliviaCustom2.node =
      '<rect fill="#039BE5" x="0" y="0" height="{h}" width="{w}" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';
    OrgChart.templates.oliviaCustom.field_0 =
      '<text data-width="230" style="font-size: 18px;" fill="#ffffff" x="170" y="40" text-anchor="middle">{val}</text>';
    OrgChart.templates.oliviaCustom2.field_0 =
      '<text data-width="230" style="font-size: 18px;" fill="#ffffff" x="170" y="40" text-anchor="middle">{val}</text>';
    OrgChart.templates.oliviaCustom.field_1 =
      '<text data-width="230" style="font-size: 18px;" fill="#ffffff" x="170" y="65" text-anchor="middle">{val}</text>';
    OrgChart.templates.oliviaCustom2.field_1 =
      '<text data-width="230" style="font-size: 18px;" fill="#ffffff" x="170" y="65" text-anchor="middle">{val}</text>';
    OrgChart.templates.oliviaCustom.field_3 =
      '<circle cx="250" cy="60" r="25" fill="#ffffff" stroke="#aeaeae" stroke-width="2"></circle><line x1="235" y1="60" x2="265" y2="60" stroke-width="2" stroke="#aeaeae"></line>';
    OrgChart.templates.customGroupUnasigned.size = [250, 120];
    OrgChart.templates.customGroupUnasigned.node =
      '<rect rx="50" ry="50" x="0" y="0" height="{h}" width="{w}" fill="#f2f2f2" stroke-width="0"></rect>';
    OrgChart.templates.customGroupUnasigned.link =
      '<path stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}" />';
    OrgChart.templates.olivia.link =
      '<path stroke="#000000" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}" />';
    OrgChart.templates.group.link =
      '<path stroke="#000000" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}" />';
    OrgChart.templates.customGroupUnasigned.nodeMenuButton =
      '<g style="cursor:pointer;" transform="matrix(1,0,0,1,{ew},25)" data-ctrl-n-menu-id="{id}">' +
      '<g transform="matrix(1,0,0,1,-22,-8)">' +
      '<rect x="0" y="0" fill="red" fill-opacity="0" width="18" height="22">' +
      '</rect><line x1="0" y1="2" x2="9" y2="2" stroke="#aeaeae" stroke-width="1">' +
      '</line><line x1="0" y1="9" x2="18" y2="9" stroke="#aeaeae" stroke-width="1">' +
      '</line><line x1="0" y1="16" x2="22" y2="16" stroke="#aeaeae" stroke-width="1">' +
      "</line></g></g>";

    var google_import_btn = `
        <svg googleButton="true" viewBox="220.893 132.659 175 40" width="175" height="40" x="40" y="-50" xmlns="http://www.w3.org/2000/svg">
            <rect googleButton="true" width="175" height="40" rx="20" fill="#F2F2F2" x="220.893" y="132.659" transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 7.105427357601002e-15)"/>
            <g googleButton="true" clip-path="url(#clip0_710_6233)" transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 220.89320373535156, 132.6593017578125)">
                <path googleButton="true" d="M31.6 20.2273C31.6 19.5182 31.5364 18.8364 31.4182 18.1818H22V22.05H27.3818C27.15 23.3 26.4455 24.3591 25.3864 25.0682V27.5773H28.6182C30.5091 25.8364 31.6 23.2727 31.6 20.2273Z" fill="#4285F4"/>
                <path googleButton="true" d="M22 30C24.7 30 26.9636 29.1045 28.6181 27.5773L25.3863 25.0682C24.4909 25.6682 23.3454 26.0227 22 26.0227C19.3954 26.0227 17.1909 24.2636 16.4045 21.9H13.0636V24.4909C14.7091 27.7591 18.0909 30 22 30Z" fill="#34A853"/>
                <path googleButton="true" d="M16.4045 21.9C16.2045 21.3 16.0909 20.6591 16.0909 20C16.0909 19.3409 16.2045 18.7 16.4045 18.1V15.5091H13.0636C12.3864 16.8591 12 18.3864 12 20C12 21.6136 12.3864 23.1409 13.0636 24.4909L16.4045 21.9Z" fill="#FBBC04"/>
                <path googleButton="true" d="M22 13.9773C23.4681 13.9773 24.7863 14.4818 25.8227 15.4727L28.6909 12.6045C26.9591 10.9909 24.6954 10 22 10C18.0909 10 14.7091 12.2409 13.0636 15.5091L16.4045 18.1C17.1909 15.7364 19.3954 13.9773 22 13.9773Z" fill="#E94235"/>
            </g>
            <text googleButton="true" style="white-space: pre;" x="272.591" y="187.66" dx="-13.213" dy="-30.391" transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 7.105427357601002e-15)">Import Employees</text>
        </svg>
            `;

    OrgChart.templates.customGroupUnasigned.field_0 = google_import_btn;
    OrgChart.templates.customGroupUnasigned.field_1 = "";
    OrgChart.templates.customGroupUnasigned.field_2 = "";
    OrgChart.templates.customGroupUnasigned.field_3 = "";

    // '<defs>                         <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">                            <stop id="stop1" stop-color="rgba(248, 117, 55, 1)" offset="0%"></stop>                            <stop id="stop2" stop-color="rgba(251, 168, 31, 1)" offset="100%"></stop>                        </linearGradient>                    </defs>                <path fill="url(#sw-gradient)" d="M24,-27.5C31.8,-22,39.4,-15.1,40.9,-7.2C42.3,0.8,37.7,9.9,32,17.4C26.4,24.8,19.8,30.5,12.1,33.3C4.4,36.1,-4.3,36,-12.4,33.4C-20.5,30.7,-28,25.6,-31,18.7C-34.1,11.8,-32.7,3.1,-31.7,-6.1C-30.7,-15.4,-30.1,-25.2,-24.9,-31.1C-19.6,-37.1,-9.8,-39,-0.9,-38C8.1,-36.9,16.2,-32.9,24,-27.5Z" width="100%" height="100%" transform="translate(50 50)" stroke-width="0" style="transition: all 0.3s ease 0s;"></path>'
    // '<circle cx="145" cy="0" r="25" fill="#ffffff" stroke="#aeaeae" stroke-width="2"></circle><line x1="130" y1="0" x2="160" y2="0" stroke-width="2" stroke="#aeaeae"></line><line x1="145" y1="-15" x2="145" y2="15" stroke-width="2" stroke="#aeaeae"></line>';
    // '<text data-width="230" style="font-size: 18px;" fill="#aeaeae" x="{cw}" y="30" text-anchor="middle">'
    // + '{val}</text>';
    // '<text data-width="125" data-text-overflow="ellipsis" style="font-size: 15px;" fill="#FF0000" x="15" y="25" text-anchor="start">{val}</text>';
    // OrgChart.templates.customGroupUnasigned.field_1 = '';

    OrgChart.templates.customGroupUnasigned.ripple = {
      radius: 50,
      color: "#aeaeae",
    };
    OrgChart.templates.base.node =
      '<rect x="0" y="0" height="120" width="250" fill="#00FF00" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';
    OrgChart.templates.base.field_0 =
      '<text data-width="125" data-text-overflow="ellipsis" style="font-size: 68px;" fill="#FF0000" x="15" y="25" text-anchor="start">{val}</text>';
    OrgChart.templates.base.field_1 =
      '<text data-width="105" data-text-overflow="ellipsis" style="font-size: 11px;" fill="#ffffff" x="15" y="135" text-anchor="start">{val}</text>';
    OrgChart.templates.base.img_0 =
      '<clipPath id="{randId}"><circle cx="60" cy="60" r="40"></circle></clipPath> <image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="20" y="20" width="80" height="80"></image>';
    OrgChart.templates.base.img_1 =
      '<clipPath id="{randId}"><circle cx="600" cy="600" r="400"></circle></clipPath> <image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="500" y="500" width="80" height="80"></image>';

    chart.on("drag", function (sender, draggedNodeId, droppedNodeId) {
      console.log("drag started");
      let draggedNode = sender.get(draggedNodeId);
      if (
        draggedNode.tags.indexOf("organigram") !== -1 ||
        draggedNode.tags.indexOf("unasigned") !== -1 ||
        draggedNode.tags.indexOf("department") !== -1
      )
        return false;
      if (draggedNode.tags.includes("big-boss")) return false;
    });
    chart.onNodeClick(function (args) {
      console.log(args);
      // console.log(args);
    //   if (
    //     args.node.tags.indexOf("unasigned-node-card-style") !== -1 &&
    //     (args.event.target.hasAttribute("cx") ||
    //       args.event.target.hasAttribute("x1"))
    //   ) {
    //     chart.removeNode(args.node.id);
    //   } else 
    // console.log("args", args.event.target.attributes);
    if ( args.event.target.attributes.googlebutton !== undefined){
            console.log("----------",args.node,args.event.target);
        axios.get(endpoints.company.get_user_employees_from_google, {
          headers: {
            Authorization: `Bearer ${storageComunicator.authToken.get().access}`,
          },
        })
          .then((res) => {
            console.log("Google employees:", res.data);
            setRedrawChart(!redrawChart);
            // Further processing of Google employees data can be done here
          })
          .catch((error) => {
            console.error("Error fetching Google employees:", error);
          });
        // fetchGoogleEmployees();
        // setLeftSidebar(!leftSidebar);
      }
    });
    chart.on("drop", (sender, draggedNodeId, droppedNodeId) => {
      if (draggedNodeId === droppedNodeId) return false;
      let droppedNode = sender.get(droppedNodeId);
      let draggedNode = sender.get(draggedNodeId);
      if (draggedNode === null || droppedNode === null) return false;

      if (
        droppedNode.tags.includes("department") ||
        droppedNode.tags.includes("unasigned") ||
        droppedNode.stpid === "unasigned"
      ) {
        console.log(
          droppedNode,
          sender.get(droppedNode.id - 1000),
          sender.getNode(droppedNode.id - 1000)
        );
        if (
          droppedNode.stpid === "unasigned" ||
          droppedNode.id === "unasigned"
        ) {
          breakHiererchy(sender, draggedNode.id, droppedNode.dep_id);
        } else {
          set_node_info(draggedNode.id, droppedNode.dep_id, null);
        }
      } else if (!isNaN(draggedNodeId) && !isNaN(droppedNodeId)) {
        if (droppedNode.stpid === "unasigned") {
          breakHiererchy(sender, draggedNodeId, droppedNode.dep_id);
        } else {
          set_node_info(draggedNodeId, droppedNode.dep_id, droppedNode.id);
        }
        return false;
      }
      if (droppedNode !== null) {
        if (droppedNode.stpid === "unasigned") {
          breakHiererchy(sender, draggedNodeId, droppedNode.dep_id);
        }
      }
      return false;
    });

    chart.on("click", function (sender, args) {
      if (
        args.node.tags.indexOf("department") === -1 &&
        args.node.tags.indexOf("organigram") === -1 &&
        args.node.tags.indexOf("unasigned") === -1
      ) {
        if (
          args.node.tags.indexOf("unasigned-node-card-style") !== -1 &&
          (args.event.target.hasAttribute("cx") ||
            args.event.target.hasAttribute("x1"))
        ) {
            console.log("import from goagle")
          return false;
        }
        return true;
      }
      else 
      return false;
    });
  };

  const set_node_info = (employee_id, department_id, supervizer_id) => {
    try {
      axios
        .post(
          endpoints.company.set_employee_department_and_supervizer,
          {
            employee_id: employee_id - 1000,
            department_id: department_id,
            supervizer_id: supervizer_id ? supervizer_id - 1000 : null,
          },
          {
            headers: {
              Authorization: `Bearer ${
                storageComunicator.authToken.get().access
              }`,
            },
          }
        )
        .then((res) => {
          console.log("Response from set_employee_department:", res.data);
          setRedrawChart(!redrawChart);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchGoogleEmployees = async () => {
    console.log("fetching google employees");
  };

  initializeChart();

  return (
    <div className="h-[100vh] flex steps-background">
      {/* <div
        className={` ${
          leftSidebar ? "block" : "hidden"
        } p-2 w-[300px] h-full bg-neutral-200`}
        id="sidebarLeft"
      >
        <form className="grid" onSubmit={addNewNodeForm}>
          <button
            className="button-close text-left bg-transparent text-black text-right w-5 font-bold py-2 px-4 rounded-full text-center mt-2"
            onClick={closeForm}
            value="Send"
            id="inputSend"
          >
            X
          </button>
          <label className="mb-2" htmlFor="inputName">
            Emails:
          </label>
          <textarea required id="txtArea" />
          <button
            className="text-left bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center mt-2"
            type="submit"
            value="Send"
            id="inputSend"
          >
            Add user
          </button>
        </form>
      </div> */}
      <div
        className="h-full w-full bg-neutral-800 grow"
        id="tree"
        ref={divRef}
      ></div>
    </div>
  );
};

export default Chart;
