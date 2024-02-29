import React, { useRef, useEffect, useState } from 'react';
import OrgChart from "@balkangraph/orgchart.js";
import jsonData from './nodesData.json';
import { BACKEND_URL } from '../utils/endpoints';
import axios from "axios";
import storageComunicator from '../utils/storageComunication';
// import '../index.css';

const Chart = () =>
{
    const divRef = useRef(null);
    let userList;
    let chart;
    const [rightSidebar, setRightSidebar] = useState(false);
    const [leftSidebar, setLeftSidebar] = useState(false);

    const [isMounted, setIsMounted] = useState(false);
    const [selectedNode, setNodeInfo] = useState(null);
    const [inputValues, setInputValues] = useState({
        inputEmails: ''
    });
    const deps = storageComunicator.company.get_departments();
    
   
    const initializeChart = () =>
    {
        // let users = localStorage.getItem("listUsers");

        chart = new OrgChart(divRef.current, {
            nodes: jsonData,
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
                expandAll: true
            },
            editForm: {
                generateElementsFromFields: false,
                elements: [
                    { type: 'textbox', label: 'Full Name', binding: 'name' },
                    { type: 'textbox', label: 'Title', binding: 'title' },
                    { type: 'textbox', label: 'Photo Url', binding: 'img', btn: 'Upload' },
                    { type: 'textbox', label: 'Email', binding: 'email' }
                ],
                buttons: {
                    edit: {
                        icon: OrgChart.icon.edit(24, 24, '#fff'),
                        text: 'Edit',
                        hideIfEditMode: true,
                        hideIfDetailsMode: false
                    },
                    share: {
                        icon: OrgChart.icon.share(24, 24, '#fff'),
                        text: 'Share'
                    },
                    pdf: {
                        icon: OrgChart.icon.pdf(24, 24, '#fff'),
                        text: 'Save as PDF'
                    },
                    remove: {
                        icon: OrgChart.icon.remove(24, 24, '#fff'),
                        text: 'Remove',
                        hideIfDetailsMode: true
                    }
                }
            },
            nodeBinding: {
                img_0: 'img',
                field_0: 'name',
                img_1: 'img2',
                field_1: 'title',
                field_2: 'email',
                field_3: 'button'
            },
            tags: {
                "unasigned": {
                    template: "customGroupUnasigned",
                    subTreeConfig: {
                        siblingSeparation: 15,
                        template: 'ana',
                        columns: 3,
                    }
                },
                "organigram": {
                    template: "invisibleGroup",
                    subTreeConfig: {
                        siblingSeparation: 10,
                        // align: OrgChart.align.orientation,
                        // orientation: OrgChart.orientation.top_left,
                    },
                },
                "department": {
                    template: "group"
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
                "management": {
                    subTreeConfig: {
                        siblingSeparation: 2,
                    }
                },
                "security": {
                    subTreeConfig: {
                        siblingSeparation: 2,
                    }
                },
                "it": {
                    subTreeConfig: {
                        siblingSeparation: 2,
                    }
                },
                "sales": {
                    subTreeConfig: {
                        siblingSeparation: 2,
                    }
                },
            },
        });
        for(const x of deps)
        {
            let data_dep = {
                "id": x.name,
                "name":  x.name,
                "pid":1,
                "title": x.name,
                "img": "",
                "email": x.name,
                "tags": ["department","security"],
                "button": " "
            };
            console.log(data_dep);
            chart.addNode(data_dep);
        }
    }

    const addGoogleEmails = async () =>
    {
        userList = "";
        try
        {
            // console.log(userList);
            const res = await axios.get(`${BACKEND_URL}api/googleUserList/`, {
                headers: {
                    Authorization: `Bearer ${storageComunicator.authToken.get().access}`
                }
            });
            let users = "";
            // console.log(res.data);
            for(let x of res.data)
            {
                users += x + ",";
            }
            // localStorage.setItem("listUsers", users);
            // console.log("response from new endpoint", res);
            let aux = users.split(',');
            // console.log(aux);
            let count = 0;
            // for(const email of aux)
            // {
            //     count += 1;
            //     // console.log(email);
            //     if(email !== "")
            //     {
            //         // setTimeout(() =>
            //         // {
            //             let id = getLastId();
            //             // console.log(id);
            //             // console.log(isIdinChart(id));
            //             let data = {
            //                 "id": id,
            //                 "name": "",
            //                 "stpid": "unasigned",
            //                 "title": email,
            //                 "img": "",
            //                 "email": email,
            //                 "tags": ["unasigned-google-node-card-style"],
            //                 "button": " "
            //             };
            //             // console.log(data);
            //             if(!getEmailsFromGoogleAccount(email))
            //                 chart.addNode(data);
            //         // }, 200 * count);
            //     }
            // }
        } catch(err)
        {
            console.log("error from new endpoint", err);
        }
    };
    const getEmailsFromGoogleAccount = (data) =>
    {
        // console.log(chart);
        for(const x in chart.nodes)
        {
            // console.log(chart.get(x));
            if(chart.get(x).title === data)
            {
                return true;
            }
        }
        return false;
    }


    const handleChange = (e) =>
    {
        const { id, value } = e.target;
        setInputValues({ ...inputValues, [id]: value });
    };
    // function setContent(node) {
    //     right_sidebar.innerHTML = `
    //         <div class="flex flex-col items-center">
    //             <img src="${node.img}" alt="user" class="w-24 h-24 rounded-full mb-2">
    //             <h1 class="text-lg font-bold">${node.name}</h1>
    //             <p class="text-sm text-gray-400">${node.title}</p>
    //         </div>
    //     `;
    // }


    const getLastId = () =>
    {
        let rez = -1;
        if(chart.nodes === null)
        {
            return 0;
        }
        else if(chart.nodes)
        {
            for(let x in chart.nodes)
            {
                // console.log(x);
                if(!isNaN(x))
                {
                    if(parseInt(x) > rez)
                    {
                        rez = parseInt(x);
                    }
                }
            }
        }
        return rez + 1
    }
    const isIdinChart = (id) =>
    {
        for(const x in chart.nodes)
        {
            if(x.id === id)
            {
                return true;
            }
        }
        return false;
    }
    const addNewNodeForm = (e) =>
    {
        e.preventDefault();
        let emails = document.getElementById("txtArea");
        let delimiters = /,|\n|\t|\s|;/;
        let email_list = emails.value.split(delimiters);
        let count = 0;

        for(const email of email_list)
        {
            count += 1;
            if(email !== "")
            {
                setTimeout(() =>
                {
                    let id = getLastId();
                    // console.log(isIdinChart(id));
                    if(!isIdinChart(id))
                    {
                        let data = {
                            "id": id,
                            "name": "",
                            "stpid": "unasigned",
                            "title": email,
                            "img": "",
                            "email": email,
                            "tags": ["unasigned-node-card-style"],
                            "button": " "
                        }
                        // console.log(data);

                        // chart.addNode(data);

                        chart.addNode(data);
                    }
                }, 200 * count);
            }
        }
        emails.value = '';
        // let name = inputValues.inputName;
        // let pos = inputValues.inputPos;
        // let emails = inputValues.inputEmails;
        // console.log(e);
        // let img = inputValues.inputImage;
        // if(name === '' || pos === '' || email === '') return false;
        // console.log(name, pos, email, img);

        // console.log(email_list);
        // setLeftSidebar(!leftSidebar);

        // let id = getLastId();
        // let data = {
        //     "id": id,
        //     "name": name,
        //     "stpid": "unasigned",
        //     "title": pos,
        //     "img": img,
        //     "email": email,
        //     "tags": ["unasigned-node-card-style"],
        //     "button": " "
        // }
        // // console.log(getLastId());
        // chart.addNode(data);
        // setInputValues({
        //     inputEmails: ''
        // });
        //     inputName: '',
        //     inputPos: '',
        //     inputEmail: '',
        //     inputImage: ''
        // });
        // console.log(chart);
    }
    const closeForm = () =>
    {
        setLeftSidebar(!leftSidebar);
    }
    useEffect(() =>
    {
        initializeChart();
        // if(!isMounted){
        //     setIsMounted(true);
        addGoogleEmails();
        // }

        OrgChart.templates.customGroupUnasigned = Object.assign({}, OrgChart.templates.ana);
        OrgChart.templates.oliviaCustom = Object.assign({}, OrgChart.templates.olivia);
        OrgChart.templates.oliviaCustom.node =
            '<rect fill="#039BE5" x="0" y="0" height="{h}" width="{w}" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';
        OrgChart.templates.oliviaCustom2 = Object.assign({}, OrgChart.templates.olivia);
        OrgChart.templates.oliviaCustom2.node =
            '<rect fill="#039BE5" x="0" y="0" height="{h}" width="{w}" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';
        OrgChart.templates.oliviaCustom.field_0 = '<text data-width="230" style="font-size: 18px;" fill="#ffffff" x="170" y="40" text-anchor="middle">{val}</text>';
        OrgChart.templates.oliviaCustom2.field_0 = '<text data-width="230" style="font-size: 18px;" fill="#ffffff" x="170" y="40" text-anchor="middle">{val}</text>';
        OrgChart.templates.oliviaCustom.field_1 = '<text data-width="230" style="font-size: 18px;" fill="#ffffff" x="170" y="65" text-anchor="middle">{val}</text>';
        OrgChart.templates.oliviaCustom2.field_1 = '<text data-width="230" style="font-size: 18px;" fill="#ffffff" x="170" y="65" text-anchor="middle">{val}</text>';
        OrgChart.templates.oliviaCustom.field_3 = '<circle cx="250" cy="60" r="25" fill="#ffffff" stroke="#aeaeae" stroke-width="2"></circle><line x1="235" y1="60" x2="265" y2="60" stroke-width="2" stroke="#aeaeae"></line>';
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
            '<g style="cursor:pointer;" transform="matrix(1,0,0,1,{ew},25)" data-ctrl-n-menu-id="{id}">'
            + '<g transform="matrix(1,0,0,1,-22,-8)">'
            + '<rect x="0" y="0" fill="red" fill-opacity="0" width="18" height="22">'
            + '</rect><line x1="0" y1="2" x2="9" y2="2" stroke="#aeaeae" stroke-width="1">'
            + '</line><line x1="0" y1="9" x2="18" y2="9" stroke="#aeaeae" stroke-width="1">'
            + '</line><line x1="0" y1="16" x2="22" y2="16" stroke="#aeaeae" stroke-width="1">'
            + '</line></g></g>';
        OrgChart.templates.customGroupUnasigned.field_0 =
            '<circle cx="145" cy="0" r="25" fill="#ffffff" stroke="#aeaeae" stroke-width="2"></circle><line x1="130" y1="0" x2="160" y2="0" stroke-width="2" stroke="#aeaeae"></line><line x1="145" y1="-15" x2="145" y2="15" stroke-width="2" stroke="#aeaeae"></line>';
        // '<text data-width="230" style="font-size: 18px;" fill="#aeaeae" x="{cw}" y="30" text-anchor="middle">'
        // + '{val}</text>';
        // '<text data-width="125" data-text-overflow="ellipsis" style="font-size: 15px;" fill="#FF0000" x="15" y="25" text-anchor="start">{val}</text>';
        // OrgChart.templates.customGroupUnasigned.field_1 = '';

        OrgChart.templates.customGroupUnasigned.ripple = {
            radius: 50,
            color: "#aeaeae"
        };
        OrgChart.templates.base.node =
            '<rect x="0" y="0" height="120" width="250" fill="#00FF00" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>'
        OrgChart.templates.base.field_0 =
            '<text data-width="125" data-text-overflow="ellipsis" style="font-size: 68px;" fill="#FF0000" x="15" y="25" text-anchor="start">{val}</text>';
        OrgChart.templates.base.field_1 =
            '<text data-width="105" data-text-overflow="ellipsis" style="font-size: 11px;" fill="#ffffff" x="15" y="135" text-anchor="start">{val}</text>';
        OrgChart.templates.base.img_0 =
            '<clipPath id="{randId}"><circle cx="60" cy="60" r="40"></circle></clipPath> <image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="20" y="20" width="80" height="80"></image>';
        OrgChart.templates.base.img_1 =
            '<clipPath id="{randId}"><circle cx="600" cy="600" r="400"></circle></clipPath> <image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="500" y="500" width="80" height="80"></image>';

        const breakHiererchy = (sender, nodeId) =>
        {
            let node = sender.get(nodeId);
            node.pid = null;
            node.stpid = "unasigned";
            node.tags = ["unasigned-node-card-style"];
            sender.updateNode(node);

            for(const child of sender.getNode(nodeId).children)
            {
                breakHiererchy(sender, child.id);
            }
        }



        console.log(OrgChart)

        chart.on("drag", function (sender, draggedNodeId, droppedNodeId)
        {
            console.log("drag started");
            let draggedNode = sender.get(draggedNodeId);
            if((draggedNode.tags.indexOf("organigram") !== -1)
                || (draggedNode.tags.indexOf("unasigned") !== -1)
                || (draggedNode.tags.indexOf("department") !== -1))
                return false;
            // if(draggedNodeId === "organigram" ||
            //     draggedNodeId === "unasigned" ||
            //     draggedNodeId === "management" ||
            //     draggedNodeId === "security" ||
            //     draggedNodeId === "it" ||
            //     draggedNodeId === "sales")
            // if(!draggedNode.tags) return false;
            if(draggedNode.tags.includes("big-boss")) return false;
        });
        const handleCreateNode = () =>
        {
            // Logic for creating a node
            console.log("Creating node...");
        };
        const createNode = () =>
        {
            console.log("create new node :)")
            let inputName = document.getElementById("inputName");
            let inputPos = document.getElementById("inputPos");
            console.log(inputName.value)
            console.log(inputPos.value)
        }
        chart.onNodeClick(function (args)
        {
            console.log(args);
            // console.log(args);
            if(args.node.tags.indexOf("unasigned-node-card-style") !== -1 && (args.event.target.hasAttribute("cx") || args.event.target.hasAttribute("x1")))
            {
                chart.removeNode(args.node.id);
            }
            else if(args.node.id === "unasigned" && (args.event.target.hasAttribute("cx") || args.event.target.hasAttribute("x1")))
            {
                setLeftSidebar(!leftSidebar);
                // if(selectedNode !== null)
                // {
                //     if(selectedNode.id === args.node.id)
                //     {
                //         setLeftSidebar(!leftSidebar);

                //         return false;
                //     } else
                //     {
                //         if(!leftSidebar) setLeftSidebar(!leftSidebar);
                //         setNodeInfo(chart.get(args.node.id));
                //         return false;
                //     }
                // } else
                // {
                //     setLeftSidebar(!leftSidebar);
                //     setNodeInfo(chart.get(args.node.id));
                // }

            }
        });
        chart.on("drop", (sender, draggedNodeId, droppedNodeId) =>
        {
            try
            {
                if(draggedNodeId === droppedNodeId) return false;
                let droppedNode = sender.get(droppedNodeId);
                let draggedNode = sender.get(draggedNodeId);
                if(draggedNode === null || droppedNode === null) return false;
                console.log(sender.getNode(droppedNode.id));
                if(droppedNode.tags.indexOf("department") !== -1)
                {
                    console.log("user drop over department");
                    draggedNode.tags = ["asigned-node-card-style"];
                    draggedNode.pid = null;
                    draggedNode.stpid = droppedNodeId;
                    sender.updateNode(draggedNode);

                    return false;
                } else if(!isNaN(draggedNodeId) && !isNaN(droppedNodeId))
                {
                    if(droppedNode.stpid === "unasigned")
                    {
                        breakHiererchy(sender, draggedNodeId);
                        setTimeout(() =>
                        {
                            sender.updateNode(sender.get(draggedNodeId));
                        }, 500);
                    } else
                    {
                        console.log("user dropped on another user")
                        draggedNode.pid = droppedNodeId;
                        draggedNode.stpid = null;
                        draggedNode.tags = ["asigned-node-card-style"];
                        sender.updateNode(draggedNode);
                    }
                    return false;
                }
                console.log("drop started");
                if(droppedNode !== null) 
                {
                    console.log(droppedNode)
                    if(droppedNode.tags.indexOf("unasigned") !== -1)
                    {
                        breakHiererchy(sender, draggedNodeId);
                        setTimeout(() =>
                        {
                            sender.updateNode(sender.get(draggedNodeId));
                        }, 500);
                    }
                    return false;
                }
            } catch(e)
            {
                console.log(e);
            }
            // chart.roots = ["unasigned", "organigram"]
        });

        chart.onUpdateNode((args) =>
        {
            // chart.fit();/
            // console.log(args);
        });

        chart.on('click', function (sender, args)
        {
            // if(selectedNode !== null){
            //     if(selectedNode.id === args.node.id) {
            //         setLeftSidebar(!leftSidebar); 
            //         return false;
            //     }else {
            //         if(!leftSidebar) setLeftSidebar(!leftSidebar);
            //         setNodeInfo(sender.get(args.node.id));
            //         return false;
            //     }
            // }else {
            //     setLeftSidebar(!leftSidebar); 
            //     setNodeInfo(sender.get(args.node.id));
            // }
            console.log(args)
            if(args.node.tags.indexOf("department") === -1
                && args.node.tags.indexOf("organigram") === -1
                && args.node.tags.indexOf("unasigned") === -1
            )
            {
                if(args.node.tags.indexOf("unasigned-node-card-style") !== -1 && (args.event.target.hasAttribute("cx") || args.event.target.hasAttribute("x1")))
                {
                    return false;
                }
                return true;
            }
            //! if node id is not a number, it is a group
            // if(isNaN(args.node.id)) {
            //     console.log("group = ", args.node.id)
            //     return false;
            // }
            // console.log(sender.get(args.node.id).tags());
            return false;
        });
    }, [rightSidebar, leftSidebar, selectedNode, initializeChart, chart]);

    return (
        <div className='h-[100vh] flex steps-background'>
            <div className={` ${leftSidebar ? 'block' : 'hidden'} p-2 w-[300px] h-full bg-neutral-200`} id="sidebarLeft">
                <form className="grid" onSubmit={addNewNodeForm} >
                    <button className="button-close text-left bg-transparent text-black text-right w-5 font-bold py-2 px-4 rounded-full text-center mt-2" onClick={closeForm} value='Send' id='inputSend'>X</button>
                    <label className="mb-2" htmlFor="inputName">Emails:</label>
                    <textarea required id="txtArea" />
                    {/* <input className="rounded-2xl p-1" type='text' placeholder='Emails' required id='inputEmails' value={inputValues.inputEmails} onChange={handleChange} /> */}
                    {/* <label className="mb-2" htmlFor="inputPos">Position:</label>
                    <input className="rounded-2xl p-1" type='text' placeholder='Position' required id='inputPos' value={inputValues.inputPos} onChange={handleChange} />
                    <label className="mb-2" htmlFor="inputEmail">Email:</label>
                    <input className="rounded-2xl p-1" type='email' placeholder='Email' required id='inputEmail' value={inputValues.inputEmail} onChange={handleChange} />
                    <label className="mb-2" htmlFor="inputName">Image:</label>
                    <input className="rounded-2xl p-1" type='text' placeholder='Image' id='inputImage' value={inputValues.inputImage} onChange={handleChange} /> */}
                    <button className="text-left bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center mt-2" type='submit' value='Send' id='inputSend'>Add user</button>
                </form>
            </div>
            <div className='h-full w-full bg-neutral-800 grow' id="tree" ref={divRef}></div>
            <div className={` ${rightSidebar ? 'block' : 'hidden'} p-2 w-[300px] h-full bg-neutral-200`}>right</div>
        </div>
    );
}

export default Chart;
