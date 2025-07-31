import { useEffect, useState } from "react";
import { fetchUsers } from "../../services/api";
import s from "./Users.module.css";
import loaderSvg from "../../assets/loader.svg";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsError(false);
                setIsLoading(true);
                const { users, total_pages } = await fetchUsers(page);
                setUsers((prev) => {
                    const uniqueUsers = users.filter(
                        (newUser) => !prev.some((existing) => existing.id === newUser.id)
                    );
                    console.log(users);
                    return [...prev, ...uniqueUsers];
                });
                setTotalPages(total_pages);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [page]);

    const formatPhoneNumber = (phone) => {
        const digits = phone.replace(/\D/g, "");

        if (digits.length === 12 && digits.startsWith("380")) {
            const code = digits.slice(2, 5);
            const part1 = digits.slice(5, 8);
            const part2 = digits.slice(8, 10);
            const part3 = digits.slice(10);

            return `+38 (${code}) ${part1} ${part2} ${part3}`;
        }

        return phone;
    };

    return (
        <div className={s.getSection}>
            <h2 className={s.sectionTitle}>Working with GET request</h2>
            <ul className={s.usersList}>
                {users.map((user) => (
                    <li key={user.id} className={s.userItem}>
                        <img src={user.photo} alt={user.name} className={s.userAvatar} />
                        <h3 className={`${s.userInfo} ${s.truncate}`} title={user.name}>
                            {user.name}
                        </h3>
                        <div>
                            <p className={`${s.userInfo} ${s.truncate}`}>{user.position}</p>
                            <p className={`${s.userInfo} ${s.truncate}`} title={user.email}>
                                {user.email}
                            </p>
                            <p className={`${s.userInfo} ${s.truncate}`}>
                                {formatPhoneNumber(user.phone)}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            {isLoading && <img src={loaderSvg} alt="loader" className={s.loader} />}
            {isError && (
                <p className={s.isError}>Something went wrong. Please, try again.</p>
            )}
            {page < totalPages && !isLoading && (
                <button
                    className={s.showMoreBtn}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Show more
                </button>
            )}
        </div>
    );
};
export default Users;
