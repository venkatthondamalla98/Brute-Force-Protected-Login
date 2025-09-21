import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
  IconButton,
  InputAdornment,
  LinearProgress,
  Fade
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Security,
  Warning,
  CheckCircle,
  Block
} from "@mui/icons-material";
import { ReportProblem as ErrorIcon } from "@mui/icons-material";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [ip, setIp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorType, setErrorType] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState(null);
  const [suspensionTime, setSuspensionTime] = useState(null);


  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        console.log("Fetched IP:", response.data.ip);
        setIp(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
        setIp("unknown");
      }
    };

    fetchIp();
  }, []);

  useEffect(() => {
    if (error || success) {
      setSnackbarOpen(true);
    }
  }, [error, success]);

  const getErrorIcon = () => {
    switch (errorType) {
      case "suspended":
        return <Security color="warning" />;
      case "blocked":
        return <Block color="error" />;
      case "invalid":
        return <ErrorIcon color="error" />;
      default:
        return <ErrorIcon color="error" />;
    }
  };

  const getErrorSeverity = () => {
    switch (errorType) {
      case "suspended":
        return "warning";
      case "blocked":
        return "error";
      case "invalid":
        return "error";
      default:
        return "error";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setErrorType("");
    setRemainingAttempts(null);
    setSuspensionTime(null);


    if (!email || !password) {
      setError("Please fill in all fields");
      setErrorType("validation");
      setLoading(false);
      return;
    }

    if (!ip || ip === "unknown") {
      setError("Unable to verify your location. Please refresh and try again.");
      setErrorType("network");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://brute-force-protected-login-e7jv.onrender.com/api/auth/login", {
        email,
        password,
        ip
      });

      console.log("Login response:", response.data);

      if (response.data.success) {
        setSuccess(response.data.message);
        setErrorType("");


        if (response.data.data && response.data.data.token) {
          localStorage.setItem("authToken", response.data.data.token);
          localStorage.setItem("userData", JSON.stringify(response.data.data.user));
        }

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      }

    } catch (err) {
      console.error("Login error:", err.response?.data);

      const errorData = err.response?.data;
      const status = err.response?.status;

      if (errorData) {
        setError(errorData.error || errorData.message || "Login failed");

        switch (status) {
          case 401:
            setErrorType("invalid");
            const attemptsMatch = errorData.error.match(/(\d+) attempt\(s\) remaining/);
            if (attemptsMatch) {
              setRemainingAttempts(parseInt(attemptsMatch[1]));
            }
            break;

          case 423:
            setErrorType("suspended");
            const timeMatch = errorData.error.match(/(\d+) minutes/);
            if (timeMatch) {
              setSuspensionTime(parseInt(timeMatch[1]));
            }
            break;

          case 429:
            setErrorType("blocked");
            break;

          case 400:
            setErrorType("validation");
            break;

          case 500:
            setErrorType("server");
            setError("Server error occurred. Please try again later.");
            break;

          default:
            setErrorType("unknown");
            setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection and try again.");
        setErrorType("network");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 300);
  };

  const renderProgressBar = () => {
    if (remainingAttempts !== null && remainingAttempts < 5) {
      const progressValue = (remainingAttempts / 5) * 100;
      return (
        <Box sx={{ mt: 2, mb: 1 }}>
          <Typography variant="caption" color="warning.main" sx={{ mb: 1, display: 'block' }}>
            Attempts remaining: {remainingAttempts}/5
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            color={remainingAttempts <= 2 ? "error" : "warning"}
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "1rem",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }
      }}
    >
      <Fade in={true} timeout={800}>
        <Card
          sx={{
            maxWidth: 420,
            width: "100%",
            boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
            borderRadius: "16px",
            backdropFilter: "blur(20px)",
            background: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            zIndex: 1,
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.35)",
            },
          }}
        >
          <CardContent sx={{ padding: "3rem 2.5rem" }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <LoginIcon
                sx={{
                  fontSize: 48,
                  color: "#667eea",
                  mb: 2,
                  background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please Log In to your account
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                error={errorType === "invalid" || errorType === "validation"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover fieldset": {
                      borderColor: "#667eea",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#667eea",
                      borderWidth: "2px",
                    },
                  },
                }}
              />

              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={errorType === "invalid" || errorType === "validation"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "#667eea" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover fieldset": {
                      borderColor: "#667eea",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#667eea",
                      borderWidth: "2px",
                    },
                  },
                }}
              />

              {renderProgressBar()}

              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={loading}
                sx={{
                  padding: "1rem",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                  boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
                  },
                  "&:disabled": {
                    background: "linear-gradient(45deg, #a5b4fc 30%, #c4b5fd 90%)",
                    transform: "none",
                  },
                }}
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CircularProgress size={20} sx={{ color: "#fff" }} />
                    <Typography>Signing in...</Typography>
                  </Box>
                ) : (
                  "Sign In"
                )}
              </Button>

              {error && (
                <Fade in={true} timeout={300}>
                  <Alert
                    severity={getErrorSeverity()}
                    icon={getErrorIcon()}
                    sx={{
                      borderRadius: "12px",
                      mt: 1,
                      "& .MuiAlert-message": {
                        fontSize: "0.9rem",
                        fontWeight: 500
                      }
                    }}
                  >
                    <Typography component="div" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {errorType === "suspended" && "Account Suspended"}
                      {errorType === "blocked" && "IP Blocked"}
                      {errorType === "invalid" && "Invalid Credentials"}
                      {errorType === "validation" && "Validation Error"}
                      {errorType === "server" && "Server Error"}
                      {errorType === "network" && "Network Error"}
                      {!errorType && "Login Error"}
                    </Typography>
                    {error}
                    {suspensionTime && (
                      <Typography variant="caption" display="block" sx={{ mt: 1, opacity: 0.8 }}>
                        Your account will be available again in approximately {suspensionTime} minutes.
                      </Typography>
                    )}
                  </Alert>
                </Fade>
              )}

              {success && (
                <Fade in={true} timeout={300}>
                  <Alert
                    severity="success"
                    icon={<CheckCircle />}
                    sx={{
                      borderRadius: "12px",
                      mt: 1,
                      "& .MuiAlert-message": {
                        fontSize: "0.9rem",
                        fontWeight: 500
                      }
                    }}
                  >
                    <Typography component="div" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Login Successful
                    </Typography>
                    {success}
                    <Typography variant="caption" display="block" sx={{ mt: 1, opacity: 0.8 }}>
                      Redirecting to dashboard...
                    </Typography>
                  </Alert>
                </Fade>
              )}
            </Box>
          </CardContent>
        </Card>
      </Fade>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={success ? "success" : getErrorSeverity()}
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {success || error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;