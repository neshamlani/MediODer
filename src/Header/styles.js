import {makeStyles} from '@material-ui/styles'

const useStyles=makeStyles((theme)=>({
    header:{
        display:'flex',
        justifyContent:'flex-end'
    },
    link:{
        textDecoration:'none',
        color:'white'
    },
}))

export default useStyles