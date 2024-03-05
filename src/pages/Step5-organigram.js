import React, { useRef, useEffect, useState } from "react";
import OrgChart from "@balkangraph/orgchart.js";
import axios from "axios";
import storageComunicator from "../utils/storageComunication";
import { endpoints } from "../utils/endpoints";

const Chart = () => {
  const divRef = useRef(null);
  let chart;
  const [leftSidebar, setLeftSidebar] = useState(false);
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
            button: " ",
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
    OrgChart.templates.customGroupUnasigned.field_0 =
      '<circle cx="145" cy="0" r="25" fill="#ffffff" stroke="#aeaeae" stroke-width="2"></circle><line x1="130" y1="0" x2="160" y2="0" stroke-width="2" stroke="#aeaeae"></line><line x1="145" y1="-15" x2="145" y2="15" stroke-width="2" stroke="#aeaeae"></line>';
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
      if (
        args.node.tags.indexOf("unasigned-node-card-style") !== -1 &&
        (args.event.target.hasAttribute("cx") ||
          args.event.target.hasAttribute("x1"))
      ) {
        chart.removeNode(args.node.id);
      } else if (
        args.node.id === "unasigned" &&
        (args.event.target.hasAttribute("cx") ||
          args.event.target.hasAttribute("x1"))
      ) {
        setLeftSidebar(!leftSidebar);
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
          return false;
        }
        return true;
      }
      return false;
    });
  };
  const closeForm = () => {
    setLeftSidebar(!leftSidebar);
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
  initializeChart();

  return (
    <div className="h-[100vh] flex steps-background">
      <div
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
      </div>
      <div
        className="h-full w-full bg-neutral-800 grow"
        id="tree"
        ref={divRef}
      ></div>
    </div>
  );
};

export default Chart;
