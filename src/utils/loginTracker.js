// Utility to collect device and browser information for login tracking

export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;

  // Detect device type
  const getDeviceType = () => {
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return "tablet";
    }
    if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(userAgent)) {
      return "mobile";
    }
    return "desktop";
  };

  // Detect device name
  const getDeviceName = () => {
    if (/iPhone/i.test(userAgent)) {
      const match = userAgent.match(/iPhone OS (\d+)/);
      return match ? `iPhone (iOS ${match[1]})` : "iPhone";
    }
    if (/iPad/i.test(userAgent)) {
      return "iPad";
    }
    if (/Android/i.test(userAgent)) {
      const match = userAgent.match(/Android (\d+(\.\d+)?)/);
      return match ? `Android Device (${match[1]})` : "Android Device";
    }
    if (/Windows NT 10/i.test(userAgent)) {
      return "Windows PC";
    }
    if (/Windows NT/i.test(userAgent)) {
      return "Windows PC";
    }
    if (/Macintosh|Mac OS X/i.test(userAgent)) {
      return "Mac";
    }
    if (/Linux/i.test(userAgent)) {
      return "Linux PC";
    }
    return "Unknown Device";
  };

  // Detect browser
  const getBrowser = () => {
    if (/Edg/i.test(userAgent)) {
      return "Microsoft Edge";
    }
    if (/Chrome/i.test(userAgent) && !/Edg/i.test(userAgent)) {
      return "Chrome";
    }
    if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
      return "Safari";
    }
    if (/Firefox/i.test(userAgent)) {
      return "Firefox";
    }
    if (/Opera|OPR/i.test(userAgent)) {
      return "Opera";
    }
    if (/MSIE|Trident/i.test(userAgent)) {
      return "Internet Explorer";
    }
    return "Unknown Browser";
  };

  // Generate a unique session ID
  const generateSessionId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  };

  return {
    device: getDeviceName(),
    deviceType: getDeviceType(),
    browser: getBrowser(),
    sessionId: generateSessionId(),
  };
};

export default getDeviceInfo;
