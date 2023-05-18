import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, TextField } from "@material-ui/core";
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(2, 0),
    },
}));

interface IValues {
    nameEvent: string;
    location: string;
    dayStart: string;
    dayEnd: string;
    image: string;
    testImage: File;
    contentEvent: string;
}

const FormEvent: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const [file, setFile] = React.useState('null');


    const { values, handleChange, handleBlur, errors, touched, setFieldValue } = useFormikContext<IValues>();
    return (
        <>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Tên sự kiện</FormLabel>
                <TextField
                    fullWidth
                    variant="outlined"
                    name='nameEvent'
                    value={values.nameEvent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập tên sự kiện'
                    helperText={touched.nameEvent ? errors.nameEvent : ""}
                    error={touched.nameEvent ? Boolean(errors.nameEvent) : false}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Địa điểm tổ chức</FormLabel>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='location'
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập địa điểm tổ chức'
                    helperText={touched.location ? errors.location : ""}
                    error={touched.location ? Boolean(errors.location) : false}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Ngày giờ bắt đầu</FormLabel>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='dayStart'
                    value={values.dayStart}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập ngày giờ bắt đầu'
                    helperText={touched.dayStart ? errors.dayStart : ""}
                    error={touched.dayStart ? Boolean(errors.dayStart) : false}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Ngày giờ kết thúc</FormLabel>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='dayEnd'
                    value={values.dayEnd}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập ngày giờ kết thúc'
                    helperText={touched.dayEnd ? errors.dayEnd : ""}
                    error={touched.dayEnd ? Boolean(errors.dayEnd) : false}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Nội dung sự kiện</FormLabel>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='contentEvent'
                    value={values.contentEvent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập nội dung sự kiện'
                    helperText={touched.contentEvent ? errors.contentEvent : ""}
                    error={touched.contentEvent ? Boolean(errors.contentEvent) : false}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Hình ảnh</FormLabel>
                {/* <Button
                variant="contained"
                component="label"
                >
                Upload File
                <input
                    type="file"
                    accept=".png,.jpg"
                    name='image'
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    hidden
                />
                </Button> */}
                <input
                    // fullWidth
                    // variant="outlined"
                    accept=".png,.jpg"
                    name='testImage'
                    type='file'
                    // value={values.image}
                    // onChange={handleChange}
                    // onChange={(e:any)=>{
                    //     setFieldValue('image', e.currentTarget.files[0]);
                    // }}
                    onChange={(e: any) => {
                        let reader = new FileReader();
                        reader.onload = () => {
                            if (reader.readyState === 2) {
                                setFieldValue("testImage", reader.result);
                            }
                        }
                        reader.readAsDataURL(e.target.files[0])
                        console.log(e.target.files[0]);
                    }}
                    onBlur={handleBlur}
                />
                <input
                    // fullWidth
                    // variant="outlined"
                    accept=".png,.jpg"
                    name='image'
                    type='file'
                    // value={values.image}
                    onChange={handleChange}
                    // onChange={(e:any)=>{
                    //     setFieldValue('image', e.currentTarget.files[0]);
                    // }}
                    // onChange={(e: any) => {
                    //     let reader = new FileReader();
                    //     reader.onload = () => {
                    //         if (reader.readyState === 2) {
                    //             setFieldValue("testImage", reader.result);
                    //         }
                    //     }
                    //     reader.readAsDataURL(e.target.files[0])
                    //     console.log(e.target.files[0]);
                    // }}
                    onBlur={handleBlur}
                />
            </FormControl>
        </>
    );
};

export default FormEvent;
