import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackArrow, StarFilled, StarOutline, UserAvatar } from "../../assets/icons";
import "./UserDetails.scss";
import { getUserById } from "../../features/users/services/userService";
import Loader from "../../components/Loader";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("General Details");

  const tabs = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
  ];

  useEffect(() => {
    if (id) {
      const data = getUserById(id);
      setUser(data);
    }
  }, [id]);

  if (!user) return <Loader />;

  const EmptyTabContent = ({ title }: { title: string }) => (
    <div className="empty-tab-state">
      <div className="content">
        <h3>No {title} Found</h3>
        <p>
          This user has not yet uploaded or linked any information for{" "}
          <strong>{title}</strong>. Please check back later or contact the user
          directly.
        </p>
      </div>
    </div>
  );

  return (
    <div className="user-details">
      <button className="user-details__back" onClick={() => navigate(-1)}>
        <img src={BackArrow} alt="" /> Back to Users
      </button>

      <div className="user-details__header-row">
        <h2>User Details</h2>
        <div className="user-details__actions">
          <button className="btn-blacklist">BLACKLIST USER</button>
          <button className="btn-activate">ACTIVATE USER</button>
        </div>
      </div>

      <header className="user-details__top-card">
        <div className="user-details__summary">
          <div className="user-details__avatar">
            <div className="avatar-placeholder">
              <img src={UserAvatar} />
            </div>
          </div>
          <div className="user-details__name-id">
            <h3>{user.personalInfo.fullName}</h3>
            <span>{user.id.substring(0, 8)}</span>
          </div>
          <div className="user-details__tier">
            <span>User's Tier</span>
            <div className="stars">
              <img src={StarFilled} alt="" />
              <img src={StarOutline} alt="" />
              <img src={StarOutline} alt="" />
            </div>
          </div>
          <div className="user-details__balance">
            <h3>₦200,000.00</h3>
            <span>9912345678/Providus Bank</span>
          </div>
        </div>

        <nav className="user-details__tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <div className="user-details__info-container">
        {activeTab === "General Details" ? (
          <>
            <section className="info-section">
              <h4>Personal Information</h4>
              <div className="info-grid">
                <div className="info-item">
                  <span>FULL NAME</span>
                  <p>{user?.personalInfo?.fullName}</p>
                </div>
                <div className="info-item">
                  <span>PHONE NUMBER</span>
                  <p>{user?.phoneNumber}</p>
                </div>
                <div className="info-item">
                  <span>EMAIL ADDRESS</span>
                  <p>{user?.email}</p>
                </div>
                <div className="info-item">
                  <span>BVN</span>
                  <p>{user?.personalInfo?.bvn}</p>
                </div>
                <div className="info-item">
                  <span>GENDER</span>
                  <p>{user?.personalInfo?.gender}</p>
                </div>
                <div className="info-item">
                  <span>MARITAL STATUS</span>
                  <p>{user?.personalInfo?.maritalStatus}</p>
                </div>
                <div className="info-item">
                  <span>CHILDREN</span>
                  <p>{user?.personalInfo?.children}</p>
                </div>
                <div className="info-item">
                  <span>TYPE OF RESIDENCE</span>
                  <p>{user?.personalInfo?.typeOfResidence}</p>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h4>Education and Employment</h4>
              <div className="info-grid">
                <div className="info-item">
                  <span>LEVEL OF EDUCATION</span>
                  <p>{user?.education?.level}</p>
                </div>
                <div className="info-item">
                  <span>EMPLOYMENT STATUS</span>
                  <p>{user?.education?.employmentStatus}</p>
                </div>
                <div className="info-item">
                  <span>SECTOR OF EMPLOYMENT</span>
                  <p>{user?.education?.sector}</p>
                </div>
                <div className="info-item">
                  <span>DURATION OF EMPLOYMENT</span>
                  <p>{user?.education?.duration}</p>
                </div>
                <div className="info-item">
                  <span>OFFICE EMAIL</span>
                  <p>{user?.education?.officeEmail}</p>
                </div>
                <div className="info-item">
                  <span>MONTHLY INCOME</span>
                  <p>
                    {user?.education?.monthlyIncome[0]} -{" "}
                    {user?.education?.monthlyIncome[1]}
                  </p>
                </div>
                <div className="info-item">
                  <span>LOAN REPAYMENT</span>
                  <p>{user?.education?.loanRepayment}</p>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h4>Socials</h4>
              <div className="info-grid">
                <div className="info-item">
                  <span>TWITTER</span>
                  <p>{user?.socials?.twitter}</p>
                </div>
                <div className="info-item">
                  <span>FACEBOOK</span>
                  <p>{user?.socials?.facebook}</p>
                </div>
                <div className="info-item">
                  <span>INSTAGRAM</span>
                  <p>{user?.socials?.instagram}</p>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h4>Guarantor</h4>
              <div className="info-grid">
                <div className="info-item">
                  <span>FULL NAME</span>
                  <p>{user?.guarantor?.fullName}</p>
                </div>
                <div className="info-item">
                  <span>PHONE NUMBER</span>
                  <p>{user?.guarantor?.phoneNumber}</p>
                </div>
                <div className="info-item">
                  <span>EMAIL ADDRESS</span>
                  <p>{user?.guarantor?.email}</p>
                </div>
                <div className="info-item">
                  <span>RELATIONSHIP</span>
                  <p>{user?.guarantor?.relationship}</p>
                </div>
              </div>
            </section>
          </>
        ) : (
          <EmptyTabContent title={activeTab} />
        )}
      </div>
    </div>
  );
};

export default UserDetails;
