import { useState } from 'react';
import Building from "./Buildings";
import Floor from "./Floors";
import Door from './Door';
import Compliance from './ComplianceId'
import DoorAstragal from './DoorAstragal';
import DoorStop from './DoorStop';
import DoorMagholder from './DoorMagHolder';
import DoorFlushbolt from './DoorFlushbolt';
import DoorCoordinator from './DoorCoordinator';
import DoorCloser from './DoorCloser';
import DoorCylinder from './DoorCylinder';
import DoorDelayegress from './DoorDelayEgress';
import DoorTrim from './DoorTrim';
import DoorExitdevice from './DoorExitDevice';
import DoorStrike from './DoorStrike';
import DoorElectriclockset from './DoorElectricLockSet';
import DoorLockset from './DoorLockset';
import DoorPivot from './DoorPivot';
import DoorSeal from './DoorSeal';
import DoorHinge from './DoorHinge';
import DoorContinuoushinge from './DoorContinousHinge';
import DoorTransom from './DoorTransom';
import DoorType from './DoorType';
import DoorFrame from './DoorFrame';
import DoorFirerating from './DoorFireRating';
import DoorCategory from './DoorCategory';
import DoorPowertransfer from './DoorPowerTransfer';
import DoorMaterial from './DoorMaterial';
import DoorSize from './DoorSize';
import VisionLite from './VisionLite';
import SideLite from './SideLite';
import Silencer from './Silencer';
import DoorHingeSize from './DoorHingeSize';
import DoorSweep from './DoorSweeps';
import DoorDeficiencies from './DoorDeficiencies';
import Button from '@mui/material/Button';
import '../HomePage.css'
import '../EditPage.css'
import { ButtonBase, ButtonGroup } from '@mui/material';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ExcelToCSV from './ExcelToCSV';
import DoorDeficienciesTable from './DoorDeficiencyTable'


const Format = (props) => {


    const [floor, setFloor] = useState("")
    const [door,setDoor] = useState("")
    const [attributes, setAttributes] = useState({})
    const cookies = new Cookies();


    const handleFloorCallback = (floorData) => {
        setFloor(floorData)
        setDoor ("")
        setAttributes ({})
    }
    const handleDoorCallback = (doorData) =>{
        setDoor(doorData)
        setAttributes ({})
    }

    const handleAttributesCallback = (attributesData) => {        
        setAttributes(attributes => ({...attributes, ...attributesData}))
        console.log ("attributedata data", attributes)
    }

    const handleAstragalCB = (newValue) => {
        let val = {...attributes}
        val["astragal_id"] = newValue
        console.log ("astragal, ",attributes, newValue)
        setAttributes (attributes => ({...attributes, ...val}))
    }
    const handleComplianceCB = (newValue) => {
        let val = {"compliance_id": newValue}
        setAttributes (attributes => ({...attributes, ...val}))
        console.log(newValue, attributes["compliance_id"])
    }
    const handleStopCB = (newValue) => {
        attributes["stop_id"] = newValue
        console.log(newValue, attributes["stop_id"])
    }
    const handleMagHolderCB = (newValue) => {
        attributes["mag_holder_id"] = newValue
        console.log(newValue, attributes["mag_holder_id"])
    }
    const handleFlushBoltCB = (newValue) => {
        attributes["flush_bolt_id"] = newValue
        console.log(newValue, attributes["flush_bolt_id"])
    }
    const handleCoordinatorCB = (newValue) => {
        attributes["coordinator_id"] = newValue
        console.log(newValue, attributes["coordinator_id"])
    }
    const handleCloserCB = (newValue) => {
        attributes["closer_id"] = newValue
        console.log(newValue, attributes["closer_id"])
    }
    const handleCylinderCB = (newValue) => {
        attributes["cylinder_id"] = newValue
        console.log(newValue, attributes["cylinder_id"])
    }
    const handleDelayEgressCB = (newValue) => {
        attributes["delay_egress_id"] = newValue
        console.log(newValue, attributes["delay_egress_id"])
    }
    const handleTrimCB = (newValue) => {
        attributes["trim_id"] = newValue
        console.log(newValue, attributes["trim_id"])
    }
    const handleExitDeviceCB = (newValue) => {
        attributes["delay_egress_id"] = newValue
        console.log(newValue, attributes["delay_egress_id"])
    }
    const handleStrikeCB = (newValue) => {
        attributes["strike_id"] = newValue
        console.log(newValue, attributes["strike_id"])
    }
    const handleLockSetCB = (newValue) => {
        attributes["lockset_id"] = newValue
        console.log(newValue, attributes["lockset_id"])
    }
    const handleEletricLockSetCB = (newValue) => {
        attributes["electric_lockset_id"] = newValue
        console.log(newValue, attributes["electric_lockset_id"])
    }
    const handlePivotCB = (newValue) => {
        attributes["pivot_id"] = newValue
        console.log(newValue, attributes["pivot_id"])
    }
    const handleHingeCB = (newValue) => {
        attributes["hinge_id"] = newValue
        console.log(newValue, attributes["hinge_id"])
    }
    const handleContinuousHingeCB = (newValue) => {
        attributes["continous_hinge_id"] = newValue
        console.log(newValue, attributes["continous_hinge_id"])
    }
    const handleTransomCB = (newValue) => {
        attributes["transom_id"] = newValue
        console.log(newValue, attributes["transom_id"])
    }
    const handleTypeCB = (newValue) => {
        attributes["type_id"] = newValue
        console.log(newValue, attributes["type_id"])
    }
    const handleFrameCB = (newValue) => {
        attributes["frame_id"] = newValue
        console.log(newValue, attributes["frame_id"])
    }
    const handleDoorMaterialCB = (newValue) => {
        attributes["door_material_id"] = newValue
        console.log(newValue, attributes["door_material_id"])
    }
    const handleDoorSize = (newValue) => {
        attributes["size_id"] = newValue
        console.log(newValue, attributes["size_id"])
    }
    const handleFireRatingCB = (newValue) => {
        attributes["fire_rating_id"] = newValue
        console.log(newValue, attributes["fire_rating_id"])
    }
    const handleCategoryCB = (newValue) => {
        attributes["category_id"] = newValue
        console.log(newValue, attributes["category_id"])
    }
    const handlePowerTransferCB = (newValue) => {
        attributes["power_transfer_id"] = newValue
        console.log(newValue, attributes["power_transfer_id"])
    }
    const handleVisionLiteCB = (newValue) => {
        attributes["vision_lite"] = newValue
        console.log(newValue, attributes["vision_lite"])
    }
    const handleSideLiteCB = (newValue) => {
        attributes["side_lite"] = newValue
        console.log(newValue, attributes["side_lite"])
    }
    const handleHingeSizeCB = (newValue) => {
        attributes["hinge_size_id"] = newValue
        console.log(newValue, attributes["hinge_size_id"])
    }
    const handleSilencerCB = (newValue) => {
        attributes["silencer"] = newValue
        console.log(newValue, attributes["hinge_size_id"])
    }
    const handleSealSystemCB = (newValue) => {
        attributes["seal_id"] = newValue
        console.log(newValue, attributes["seal_id"])
    }
    const handleDoorSweepCB = (newValue) => {
        console.log('old sweep ', attributes["sweep_id"])
        attributes["sweep_id"] = newValue
        console.log(newValue, attributes["sweep_id"])
    }
    const handleSubmitCB = () => {
        axios.put('http://127.0.0.1:5000/api/lockshop/door', {
            "data": attributes
        }).then(response => {
            console.log ("Modification done", attributes)
            setFloor("")
            setDoor ("")
            setAttributes ({})
        })
    }

    return(
        <>
            {
            (cookies.get('jwt_token'))?
            <>
                <h1 className='title'> Door Inspector </h1> 
                {/* <ExcelToCSV></ExcelToCSV> */}
                <div className='TopWidth' >
                    <Building setFloorActive = {handleFloorCallback}/>
                    {
                        (floor !== "") ?
                        <Floor value = {floor} setDoorActive = {handleDoorCallback}/> :
                        <></>
                    }
                    {
                        (door !== "") ? 
                        <Door building_value = {floor} floor_value = {door} setAttributesActive = {handleAttributesCallback}/> :
                        <></>
                    }
                </div>
                {   
                        (Object.keys(attributes).length !== 0)?
                        <div className='content-container'>
                            <div className='row'>
                                <div className='left-panel box'>
                                    <Compliance compliance_id = {attributes["compliance_id"]} handler = {handleComplianceCB}/>
                                    <DoorAstragal astragal_id = {attributes["astragal_id"]} handler = {handleAstragalCB}/>
                                    <DoorStop stop_id = {attributes["stop_id"]} handler = {handleStopCB}/>
                                    <DoorMagholder magholder_id = {attributes["mag_holder_id"]} handler = {handleMagHolderCB}/>
                                    <DoorSize size_id = {attributes["size_id"]} handler = {handleDoorSize}/>
                                    <DoorFlushbolt flushbolt_id = {attributes["flush_bolt_id"]} handler = {handleFlushBoltCB}/>
                                    <DoorCoordinator coordinator_id = {attributes["coordinator_id"]} handler = {handleCoordinatorCB}/>
                                    <DoorCloser closer_id = {attributes["closer_id"]} handler = {handleCloserCB}/>
                                    <DoorCylinder cylinder_id = {attributes["cylinder_id"]} handler = {handleCylinderCB}/>
                                    <DoorDelayegress delayegress_id = {attributes["delay_egress_id"]} handler = {handleDelayEgressCB}/>
                                    <DoorTrim trim_id = {attributes["trim_id"]} handler = {handleTrimCB}/>
                                    <DoorExitdevice exitdevice_id = {attributes["exit_device_id"]} handler = {handleExitDeviceCB}/>
                                    <DoorStrike strike_id = {attributes["strike_id"]} handler = {handleStrikeCB}/>
                                    <SideLite side_lite = {attributes["side_lite"]} handler = {handleSideLiteCB}/>
                                    <Silencer silencer = {attributes["silencer"]} handler = {handleSilencerCB}/>
                                    <DoorSweep sweep_id = {attributes["sweep_id"]} handler = {handleDoorSweepCB}/>
                                </div>
                                <div className='right-panel box'>
                                    <DoorElectriclockset electriclockset_id = {attributes["electric_lockset_id"]} handler = {handleEletricLockSetCB}/>
                                    <DoorLockset lockset_id = {attributes["lockset_id"]} handler = {handleLockSetCB}/>
                                    <DoorPivot pivot_id = {attributes["pivot_id"]} handler = {handlePivotCB}/>
                                    <DoorHinge hinge_id = {attributes["hinge_id"]} handler = {handleHingeCB}/>
                                    <DoorHingeSize size_id = {attributes["hinge_size_id"]} handler = {handleHingeSizeCB}/>
                                    <DoorContinuoushinge continuoushinge_id = {attributes["continous_hinge_id"]} handler = {handleContinuousHingeCB}/>
                                    <DoorTransom transom_id = {attributes["transom_id"]} handler = {handleTransomCB}/>
                                    <DoorType type_id = {attributes["type_id"]} handler = {handleTypeCB}/>
                                    <DoorFrame frame_id = {attributes["frame_id"]} handler = {handleFrameCB}/>
                                    <DoorMaterial door_material_id = {attributes["door_material_id"]} handler = {handleDoorMaterialCB}/>
                                    <DoorFirerating firerating_id = {attributes["fire_rating_id"]} handler = {handleFireRatingCB}/>
                                    <DoorCategory category_id = {attributes["category_id"]} handler = {handleCategoryCB}/>
                                    <DoorSeal seal_id = {attributes["seal_id"]} handler = {handleSealSystemCB}/>
                                    <DoorPowertransfer powertransfer_id = {attributes["power_transfer_id"]} handler = {handlePowerTransferCB}/>
                                    <VisionLite vision_lite_val={attributes["vision_lite"]} handler = {handleVisionLiteCB}/>
                                </div>
                            </div>
                            <br />
                            <Button variant = 'contained' onClick={() => {handleSubmitCB ()}} >Submit</Button>
                            <h2 style={{ color: 'white'}}>Door Deficiencies</h2>
                            <DoorDeficienciesTable door_no = {attributes["door_no"]}/>
                        </div>:<></>
                }
            </>
            :<h1>User Needs to be logged in to Edit Door Information</h1>
        }
        </>
    );

}

export default Format