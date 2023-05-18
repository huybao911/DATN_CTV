import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { IUser } from "redux/types/user";
import UpdateProfile from "pages/User/UpdateProfile";
import { Box } from '@mui/material';

const Profile: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [users, setUsers] = React.useState<IUser[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    React.useEffect(() => {
        setUsers(() =>
            user?.users?.filter((user: any) =>
                user.username
            ));
    }, [user]);

    React.useEffect(() => {
        document.title = "Profile | CTV";
    }, []);

    return (
        <Box >
            {users.map((user: any) =>
                <UpdateProfile user={user} key={user._id} />
            )}
        </Box>
    );
};

export default Profile;
