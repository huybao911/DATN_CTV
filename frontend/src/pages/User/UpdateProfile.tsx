import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { updateProfile } from "redux/actions/user";
import { FormControl, TextField, Box, CircularProgress, Grid, Container, Avatar, Button } from "@mui/material";
import { BoxInfor, GrifInfor, ButtonSubmitInfor } from "layouts/navigation/style";

type Props = {
    user: any;
};

interface IInitialValues {
    username: string;
    email: string;
    fullName: string;
    birthday: string;
    mssv: string;
    classUser: string;
    phone: string;
    address: string;
    avatar: string;
}

const UpdateProfile: React.FC<Props> = ({ user }): JSX.Element => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.user);

    const initialValues: IInitialValues = {
        username: user?.username ?? "",
        email: user?.email ?? "",
        fullName: user?.fullName ?? "",
        birthday: user?.birthday ?? "",
        mssv: user?.mssv ?? "",
        classUser: user?.classUser ?? "",
        phone: user?.phone ?? "",
        address: user?.address ?? "",
        avatar: user?.avatar ?? "",
    };

    const checkAvatar = user.avatar == null ? (
        <Avatar sx={{ width: 90, height: 90, }}>{users.user.username.charAt(0).toUpperCase()}
        </Avatar>
    ) : (
        <Avatar sx={{ width: 94, height: 94, }} src={user.avatar} />
    )

    // const onHandleSubmit = (
    //     values: IInitialValues,
    //     { setSubmitting }: any
    // ): Promise<void> =>
    //     dispatch<any>(updateProfile(values, user._id, setSubmitting));

    const validationSchema = Yup.object({
        username: Yup.string().required("required!"),
        email: Yup.string().required("required!"),
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: any, { setSubmitting }) => {
                let formData = new FormData();
                formData.append("username", values.username);
                formData.append("email", values.email);
                formData.append("fullName", values.fullName);
                formData.append("birthday", values.birthday);
                formData.append("mssv", values.mssv);
                formData.append("classUser", values.classUser);
                formData.append("phone", values.phone);
                formData.append("address", values.address);
                formData.append("avatar", values.avatar);
                dispatch(updateProfile(formData, user._id, setSubmitting));
            }}
        >
            {({ isSubmitting, handleSubmit, values, handleChange, handleBlur, setFieldValue, errors, touched }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Container sx={{ maxWidth: 1200, fontSize: 14, }}>
                        <Box sx={{ fontSize: '26px', fontWeight: 1000, paddingBottom: 4 }}>Thông tin</Box>

                        <Box display={'flex'} flexDirection={'row'} justifyContent={"center"} textAlign={"center"} >

                            <Grid width={400} sx={{ paddingRight: 6 }}>
                                <BoxInfor >
                                    <Box sx={{ textAlign: "-webkit-center", }}>
                                        <Box style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 100, height: 100,
                                            border: '1px dashed rgba(145, 158, 171, 0.32)',
                                            overflow: 'hidden',
                                            borderRadius: '50%',
                                            margin: 'auto',
                                            display: 'flex'
                                        }}>
                                            <Button disableRipple style={{ backgroundColor: "white" }} variant="contained" component="label"
                                                sx={{
                                                    boxShadow: 'none',
                                                    ':hover': {
                                                        backgroundColor: 'transparent'
                                                    }
                                                }}>
                                                {checkAvatar}
                                                <input
                                                    accept="image/*"
                                                    name='avatar'
                                                    type='file'
                                                    onChange={(e: any) => {
                                                        setFieldValue('avatar', e.target.files[0]);
                                                    }}
                                                    onBlur={handleBlur}
                                                    hidden
                                                />
                                            </Button>
                                        </Box>

                                    </Box>
                                    <Box style={{ color: "rgb(33, 43, 54)", fontSize: "16px", fontWeight: "700", marginTop: "20px", marginBottom: '4px' }}>{users.user.username}</Box>
                                    <Box>Bio:</Box>
                                    <Box sx={{ marginTop: "50px" }} display={'flex'} flexDirection={'column'} justifyContent={"left"} textAlign={"left"}  >
                                        <Box style={{ paddingBottom: '10px' }}>
                                            <Box sx={{ fontWeight: 500, marginBottom: '4px', color: "rgb(33, 43, 54)" }}>Khoa </Box>
                                            <Box sx={{ color: 'rgb(99, 115, 129)' }}>{users.getDepartment.nameDepartment}</Box>
                                        </Box>
                                        <Box style={{ paddingBottom: '10px' }}>
                                            <Box sx={{ fontWeight: 500, marginBottom: '4px', color: "rgb(33, 43, 54)" }}>Trường </Box>
                                            <Box sx={{ color: 'rgb(99, 115, 129)' }}>
                                                Đại Học HUTECH
                                            </Box>
                                        </Box>
                                    </Box>
                                </BoxInfor>
                            </Grid>
                            <GrifInfor>
                                <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)', color: "rgb(33, 43, 54)" }} >
                                    <FormControl sx={{ textAlign: 'left', gap: 3, }} >
                                        <TextField
                                            fullWidth
                                            label="Tên đăng nhập"
                                            name='username'
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.username ? errors.username : ""}
                                            error={touched.username ? Boolean(errors.username) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '14px',
                                                },
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black"
                                                    },
                                                    "& fieldset": {
                                                        borderRadius: "10px",
                                                    },
                                                },
                                                "& label.Mui-focused": {
                                                    color: "black"
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ textAlign: 'left' }}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name='email'
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Nhập nội dung bài viết'
                                            helperText={touched.email ? errors.email : ""}
                                            error={touched.email ? Boolean(errors.email) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '14px',
                                                }
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black"
                                                    },
                                                    "& fieldset": {
                                                        borderRadius: "10px",
                                                    },
                                                },
                                                "& label.Mui-focused": {
                                                    color: "black"
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ textAlign: 'left' }}>
                                        <TextField
                                            fullWidth
                                            label="Họ và tên"
                                            name='fullName'
                                            value={values.fullName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.fullName ? errors.fullName : ""}
                                            error={touched.fullName ? Boolean(errors.fullName) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '14px',
                                                }
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black"
                                                    },
                                                    "& fieldset": {
                                                        borderRadius: "10px",
                                                    },
                                                },
                                                "& label.Mui-focused": {
                                                    color: "black"
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ textAlign: 'left' }}>
                                        <TextField
                                            fullWidth
                                            label="Ngày sinh"
                                            value={values.birthday}
                                            name='birthday'
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.birthday ? errors.birthday : ""}
                                            error={touched.birthday ? Boolean(errors.birthday) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '14px',
                                                }
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black"
                                                    },
                                                    "& fieldset": {
                                                        borderRadius: "10px",
                                                    },
                                                },
                                                "& label.Mui-focused": {
                                                    color: "black"
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ textAlign: 'left' }}>
                                        <TextField
                                            fullWidth
                                            label="Mã số sinh viên"
                                            name='mssv'
                                            value={values.mssv}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.mssv ? errors.mssv : ""}
                                            error={touched.mssv ? Boolean(errors.mssv) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '14px',
                                                }
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black"
                                                    },
                                                    "& fieldset": {
                                                        borderRadius: "10px",
                                                    },
                                                },
                                                "& label.Mui-focused": {
                                                    color: "black"
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ textAlign: 'left' }}>
                                        <TextField
                                            fullWidth
                                            label="Lớp"
                                            name='classUser'
                                            value={values.classUser}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.classUser ? errors.classUser : ""}
                                            error={touched.classUser ? Boolean(errors.classUser) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '14px',
                                                }
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black"
                                                    },
                                                    "& fieldset": {
                                                        borderRadius: "10px",
                                                    },
                                                },
                                                "& label.Mui-focused": {
                                                    color: "black"
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ textAlign: 'left' }}>
                                        <TextField
                                            fullWidth
                                            label="Số điện thoại"
                                            name='phone'
                                            value={values.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.phone ? errors.phone : ""}
                                            error={touched.phone ? Boolean(errors.phone) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '14px',
                                                }
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black"
                                                    },
                                                    "& fieldset": {
                                                        borderRadius: "10px",
                                                    },
                                                },
                                                "& label.Mui-focused": {
                                                    color: "black"
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ textAlign: 'left' }}>
                                        <TextField
                                            fullWidth
                                            label="Địa chỉ"
                                            name='address'
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.address ? errors.address : ""}
                                            error={touched.address ? Boolean(errors.address) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '14px',
                                                }
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black"
                                                    },
                                                    "& fieldset": {
                                                        borderRadius: "10px",
                                                    },
                                                },
                                                "& label.Mui-focused": {
                                                    color: "black"
                                                },
                                            }}
                                        />
                                    </FormControl>

                                </Box>
                                <ButtonSubmitInfor
                                    disableRipple
                                    type='submit'
                                    style={{
                                        backgroundColor: 'rgb(33, 43, 54)',
                                        color: "white",
                                        borderRadius: 6,
                                        fontSize: 14,
                                        textTransform: 'capitalize',
                                        fontWeight: 'normal',
                                        marginTop: 20
                                    }}
                                    variant='contained'
                                    disabled={isSubmitting}

                                >
                                    {isSubmitting ? <CircularProgress size='1rem' /> : "Cập nhật thông tin"}
                                </ButtonSubmitInfor>
                            </GrifInfor>
                        </Box>
                    </Container>
                </form>
            )}
        </Formik>
    );
};

export default UpdateProfile;