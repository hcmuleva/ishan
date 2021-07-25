import React,{useState} from 'react';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Spinner } from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

//import { Createuser } from './business/createuser';
import BackendService from '../services/BackendService';
import {
    useQuery,
    useMutation,
    useQueryClient,
} from 'react-query'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Spin, Space } from 'antd';
import { Doughnutbader } from './DoughnutBader';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }),
);
export default function Baderpage(props) {
  const classes = useStyles();
  const [userdata, setUserdata] = useState({})
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery('allvaders', BackendService.getAllVaders)
 // const {isLoading:vaderLoading, error:vaderError,data:vaderData}=useQuery('vaderAggregation',BackendService.getAllVaderAggregation)

  const mutation = useMutation(BackendService.createVader, {
      onSuccess: () => {
          queryClient.invalidateQueries('allvaders','vaderAggregation')
      },
  })
  // Queries
  if (isLoading) 
  return <div>
    <Space>
    <Spinner size="large" />
     Bader Data is loading.....
  </Space>
 
  </div>
console.log("DATA for vader" ,data)
  // if(vaderLoading) return <div> Vader data is loading</div>
 
  // const mylabels=[]
  // const mydata=[]
  // const backgroundColor=[]
  // const borderColor=[]
  // vaderData.data.vaders_aggregated.map( vader=>{
  //   mylabels.push(vader._id)
  //   mydata.push(vader.num_tutorial)
  //   backgroundColor.push(getColor(1))
  //   borderColor.push(getColor(2))
  // })

  // const mypapers=()=>{
  //   vaderData.data.vaders_aggregated.map( vader=>{
  //     return (<Paper elevation={3}>
  //       <Box>

  //       </Box>
  //     </Paper>)
  //   })
  
  //  return( <div className={classes.root}>
    
  // </div>)
  // }
  // console.log("\nData  Lable data ",mylabels, " \nand data ", mydata, " \nbackgroundColor",backgroundColor, "\n and borderColor",borderColor)
//    const onClickHandler = (colData, cellMeta) => {
//     console.log("DATA RECIEVED FROM TABLE ", colData, "  also META DATA ", cellMeta)
// }
  const options = {
    download: false,
    print: false,
    filter: false,
    selectableRows: false,
    responsive: "stacked",
    
}
  const mycolumns = [
    {
        name: "photo",
        label: "फोटो",
        options: {
            filter: false,
            customBodyRender: (value) => (
              
                <Avatar src={value} size={64} alt="mj" />

            )
        }
    },
    { name: "mandirName", label: "बडेर नाम", },
    { name: "localityname", label: "कहा पर" },

    { name: "subdistname", label: "सिटी" },
    { name: "pincode", label: "पिनकोड" },
    { name: "isHostal", label: "रुकने की व्यवस्था" },
   

]
  return (
    
      <div>
        <AppNavbar/>

        <Container fluid>
        {/* <Grid item xs={4}>

        <Doughnutbader  width={"30%"} mydata={mydata} labels={mylabels} backgroundColor={backgroundColor} borderColor={borderColor}/>
        </Grid>
        <Grid item xs={4}>

        </Grid>
        <Grid item xs={4}>

        </Grid> */}
     
  {data?
<MUIDataTable  columns={mycolumns} data={data.data.vaders} options={options}/>:"No Data"}
        
        </Container>
      </div>
  
    
  )
}

