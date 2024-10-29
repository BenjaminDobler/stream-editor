export interface StatefulFloat {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    value: number;
}

export interface HVBatteryRange {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    range: number;
    unit: 'UNIT_UNDEFINED' | 'UNIT_KM' | 'UNIT_MILES';
    isTrailerConsidered: boolean;
}

export interface BatteryPlugStatus {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    PlugConnected: boolean;
    PlugLocked: boolean;
    ChargingPlugType:
        | 'TYPE_UNDEFINED'
        | 'TYPE_TYPE1_AC'
        | 'TYPE_DC_COMBO1_OR_TYPE1_AC'
        | 'TYPE_TYPE2_AC'
        | 'TYPE_DC_COMBO2_OR_TYPE2_AC'
        | 'TYPE_GBT_AC'
        | 'TYPE_GBT_DC'
        | 'TYPE_CHADEMO'
        | 'TYPE_CHAOJI_DC'
        | 'TYPE_CHAOJI_COMBO_AC_TYP2'
        | 'TYPE_CHAOJI_COMBO_AC_GBT';
}

export interface DoorStatus {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    isClosed: boolean;
    isLocked: boolean;
    isSafed: boolean;
}

export interface WindowStatus {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    isClosed: boolean;
    percentOpen: number;
}

export interface StatefulBool {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    value: boolean;
}

export interface SimpleTime {
    hour: number;
    minute: number;
    second: number;
}

export interface StatefulUInt64 {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    value: number;
}

export interface StatefulUInt32 {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    value: number;
}

export interface Bool {
    value: boolean;
}

export interface WiperInterval {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    mode: 'MODE_UNDEFINED' | 'MODE_OFF' | 'MODE_INTERVAL';
    value: 'VALUE_UNDEFINED' | 'VALUE_NO_INTERVAL' | 'VALUE_LEVEL_1' | 'VALUE_LEVEL_2' | 'VALUE_LEVEL_3' | 'VALUE_LEVEL_4';
}

export interface EmergencyCallState {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    value: boolean;
    trigger: 'TRIGGER_UNDEFINED' | 'TRIGGER_MANUAL' | 'TRIGGER_AUTOMATIC';
}

export interface EmergencyAssistState {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    value:
        | 'VALUE_UNDEFINED'
        | 'VALUE_OFF'
        | 'VALUE_STANDBY'
        | 'VALUE_BACKGROUND'
        | 'VALUE_DRIVER_WARNING'
        | 'VALUE_DRIVER_ACTIVATING'
        | 'VALUE_LANE_CHANGE_BREAKING'
        | 'VALUE_VEHICLE_STOPPED'
        | 'VALUE_ERROR';
}

export interface FrictionEstimating {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    learning: boolean;
    reason: number;
    value: number;
}

export interface DetailedLocationWithoutMM {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    longitude: number;
    latitude: number;
    accuracyHorizontal: number;
    altitudeWGS84: number;
    accuracyVertical: number;
    headingYawAngle: number;
    accuracyHeadingYawAngle: number;
    preciseLocalTimeSeconds: number;
    speed2D: number;
    accuracySpeed2D: number;
    preciseLocalTimeNanoSeconds: number;
    timestamp: number;
    speed3D: number;
    accuracySpeed3D: number;
    longitudeState: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    latitudeState: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    accuracyHorizontalState: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    accuracyVerticalState: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    headingYawAngleState: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    accuracyHeadingYawAngleState: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    altitudeWGS84State: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    altitudeMeanSeaLevel: number;
    altitudeMeanSeaLevelState: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
}

export interface DetailedLocation {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    longitude: number;
    latitude: number;
    accuracyHorizontal: number;
    altitudeWGS84: number;
    accuracyVertical: number;
    headingYawAngle: number;
    accuracyHeadingYawAngle: number;
    preciseLocalTimeSeconds: number;
    speed2D: number;
    accuracySpeed2D: number;
    speed3D: number;
    accuracySpeed3D: number;
    altitudeMeanSeaLevel: number;
}

export interface WeatherCondition {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    clearWeather: boolean;
    rain: boolean;
    rainHeavy: boolean;
    snow: boolean;
    snowHeavy: boolean;
    fog: boolean;
    fogHeavy: boolean;
}

export interface TrafficHandedness {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    value: 'VALUE_UNDEFINED' | 'VALUE_RIGHT_HANDED_TRAFFIC' | 'VALUE_LEFT_HANDED_TRAFFIC';
}

export interface RampType {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    value:
        | 'RAMP_UNDEFINED'
        | 'RAMP_NO_RAMP'
        | 'RAMP_EXIT_LEFT'
        | 'RAMP_EXIT_RIGHT'
        | 'RAMP_EXIT_STRAIGHT'
        | 'RAMP_ENTRY_LEFT'
        | 'RAMP_ENTRY_RIGHT'
        | 'RAMP_ENTRY_STRAIGHT'
        | 'RAMP_TRANSITION_LEFT'
        | 'RAMP_TRANSITION_RIGHT'
        | 'RAMP_TRANSITION_STRAIGHT'
        | 'RAMP_UNSPECIFIED'
        | 'RAMP_TWO_WAY'
        | 'RAMP_DRIVE_IN_ONE_WAY'
        | 'RAMP_EXIT_ONE_WAY'
        | 'RAMP_ONE_WAY';
}

export interface SpeedLimit {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    value: number;
    source: 'SOURCE_UNDEFINED' | 'SOURCE_DIGITAL_MAP' | 'SOURCE_ONLINE_DATA' | 'SOURCE_CAMERA' | 'SOURCE_LEGISLATIVE';
}

export interface String {
    value: string;
}

export interface StatefulString {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    value: string;
}

export interface ParkingBrakeState {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    value:
        | 'VALUE_UNDEFINED'
        | 'VALUE_RELEASED'
        | 'VALUE_PARK_APPLIED'
        | 'VALUE_HOLD_APPLIED'
        | 'VALUE_RELEASING'
        | 'VALUE_APPLYING'
        | 'VALUE_UNKNOWN';
}

export interface AntiTheftSystemAlarmingStatus {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    antiTheftSystemAlarmReason:
        | 'ALARMREASON_UNDEFINED'
        | 'ALARMREASON_NO_ALARM_REASON'
        | 'ALARMREASON_DRIVERS_DOOR_OPEN'
        | 'ALARMREASON_PASSENGERS_DOOR_OPEN'
        | 'ALARMREASON_REAR_LEFT_DOOR_OPEN'
        | 'ALARMREASON_REAR_RIGHT_DOOR_OPEN'
        | 'ALARMREASON_HOOD_FRONT_OPEN'
        | 'ALARMREASON_TRUNK_REAR_OPEN'
        | 'ALARMREASON_GROUND_LOOP_REAR_WINDOW_BROKEN'
        | 'ALARMREASON_CABIN_IRUE_ARMED_ALARM'
        | 'ALARMREASON_UNAUTHORIZED_THATCHAM_EMERGENCY_ENTRY'
        | 'ALARMREASON_SOUNDER_ALARM'
        | 'ALARMREASON_TILT_SENSOR_ARMED_ALARM'
        | 'ALARMREASON_CAN_BUS_TSG_FT_TIMEOUT'
        | 'ALARMREASON_CAN_BUS_TSG_BT_TIMEOUT'
        | 'ALARMREASON_CAN_BUS_TSG_HFS_TIMEOUT'
        | 'ALARMREASON_CAN_BUS_TSG_HFBS_TIMEOUT'
        | 'ALARMREASON_CLAMP15_BCM1_INTERNALLY0'
        | 'ALARMREASON_CLAMP15_SIG1_INTERNALLY0'
        | 'ALARMREASON_RADIO_CONTACT_OPEN'
        | 'ALARMREASON_TRAILER_DISCONNECTED'
        | 'ALARMREASON_LEFT_HEADLIGHT_DISCONNECTED'
        | 'ALARMREASON_RIGHT_HEADLIGHT_DISCONNECTED'
        | 'ALARMREASON_GLOVEBOX_NOT_CLOSED'
        | 'ALARMREASON_TOP_NOT_CLOSED'
        | 'ALARMREASON_OBD_CONNECTED'
        | 'ALARMREASON_POWER_ON_RESET'
        | 'ALARMREASON_TRUNK_REAR_NO_COMMUNICATION';
    antiTheftSystemIsAlarming: boolean;
}

export interface Float {
    value: number;
}

export interface SteeringWheelPosition {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    value: 'VALUE_UNDEFINED' | 'VALUE_RIGHT_HAND_SIDE' | 'VALUE_LEFT_HAND_SIDE';
}

export interface ElectricChargingType {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    chargingType: 'CHARGINGTYPE_UNDEFINED' | 'CHARGINGTYPE_AC' | 'CHARGINGTYPE_DC' | 'CHARGINGTYPE_AWC';
}

export interface CruiseControlSystem {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    cruiseControlSystem:
        | 'CRUISECONTROLSYS_UNDEFINED'
        | 'CRUISECONTROLSYS_INACTIVE'
        | 'CRUISECONTROLSYS_CC_ACTIVE'
        | 'CRUISECONTROLSYS_ACC_ACTIVE'
        | 'CRUISECONTROLSYS_ACA_ACTIVE';
}

export interface CruiseControlSystemStatus {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    cruiseControlSystemStatus:
        | 'CRUISECONTROLSYSSTATUS_UNDEFINED'
        | 'CRUISECONTROLSYSSTATUS_OFF'
        | 'CRUISECONTROLSYSSTATUS_ACTIVE'
        | 'CRUISECONTROLSYSSTATUS_TAKEOVERREQUEST'
        | 'CRUISECONTROLSYSSTATUS_FAILURE';
}

export interface CruiseControlDesiredDistance {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    distance:
        | 'DISTANCE_UNDEFINED'
        | 'DISTANCE_NO_DISPLAY'
        | 'DISTANCE_LEVEL_1'
        | 'DISTANCE_LEVEL_2'
        | 'DISTANCE_LEVEL_3'
        | 'DISTANCE_LEVEL_4'
        | 'DISTANCE_LEVEL_5';
}

export interface UInt32 {
    value: number;
}

export interface PrivacySetupShape3 {
    isUsingLocationDataAllowed: boolean;
    isUsingRemoteAccessAllowed: boolean;
    isCollectionBasedOnConsent: boolean;
    isCollectionOfDeidentifiedDataAllowed: boolean;
    isCollectionOfIndividualRelatedDataAllowed: boolean;
    isCollectionOfAnonymousDataAllowed: boolean;
}

export interface WiperFluidLevelStatus {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    value: 'VALUE_UNDEFINED' | 'VALUE_NOT_INSTALLED' | 'VALUE_NO_SHORTAGE_DETECTED' | 'VALUE_MEDIUM_SHORTAGE_DETECTED';
}

export interface ClimatisationState {
    climastate:
        | 'CLIMASTATE_UNDEFINED'
        | 'CLIMASTATE_OFF'
        | 'CLIMASTATE_ON'
        | 'CLIMASTATE_AUTO'
        | 'CLIMASTATE_COOLING'
        | 'CLIMASTATE_ELECTRICAL_HEATING'
        | 'CLIMASTATE_VENTILATION'
        | 'CLIMASTATE_AUXILIARY_HEATING'
        | 'CLIMASTATE_COMPLETED'
        | 'CLIMASTATE_REMOTE_START_CLIMATISATION';
}

export interface CrashIntensity {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    crashInt: 'STATE_UNDEFINED' | 'CRASH_INT1' | 'CRASH_INT2' | 'CRASH_INT3' | 'NO_CRASH';
}

export interface MobileNetworkStatus {
    connectivity:
        | 'NETWORKSTATUS_UNDEFINED'
        | 'NETWORKSTATUS_DATA_DISCONNECTED'
        | 'NETWORKSTATUS_DATA_CONNECTING'
        | 'NETWORKSTATUS_DATA_CONNECTED'
        | 'NETWORKSTATUS_DATA_SUSPENDED';
}

export interface BatteryChargingReason {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    reason:
        | 'REASON_UNDEFINED'
        | 'REASON_CHARGE_MIN_SOC'
        | 'REASON_CHARGE_MAX_SOC'
        | 'REASON_CHARGE_LOW_COST'
        | 'REASON_CHARGE_OWN_CURRENT'
        | 'REASON_CHARGE_SMART_CHARGING';
}

export interface NextChargingTimerTargetReachable {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    targetReachable:
        | 'TARGETREACHABLE_UNDEFINED'
        | 'TARGETREACHABLE_CALCULATING'
        | 'TARGETREACHABLE_REACHABLE'
        | 'TARGETREACHABLE_NOT_REACHABLE';
}

export interface StatefulTemperatureKelvin {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    hmiSelectedUnit: 'UNIT_UNDEFINED' | 'UNIT_CELSIUS' | 'UNIT_FAHRENHEIT';
    temperatureValueInKelvin: number;
}

export interface ChargingRateRangePerTime {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    rate: number;
    unit:
        | 'RANGEPERTIMEUNIT_UNDEFINED'
        | 'RANGEPERTIMEUNIT_KM_PER_MIN'
        | 'RANGEPERTIMEUNIT_KM_PER_HOUR'
        | 'RANGEPERTIMEUNIT_MILES_PER_MIN'
        | 'RANGEPERTIMEUNIT_MILES_PER_HOUR';
}

export interface ClimatisationError {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    climaError:
        | 'CLIMAERROR_UNDEFINED'
        | 'CLIMAERROR_INIT'
        | 'CLIMAERROR_DEFECT'
        | 'CLIMAERROR_SYSTEM_ON'
        | 'CLIMAERROR_SYSTEM_OFF'
        | 'CLIMAERROR_TEMPORARY_UNAVAILABLE'
        | 'CLIMAERROR_FUEL_LOW'
        | 'CLIMAERROR_BATTERY_LOW'
        | 'CLIMAERROR_HV_BATTERY_LOW'
        | 'CLIMAERROR_HV_BATTERY_COLD'
        | 'CLIMAERROR_CHARGING_POWER_LOW'
        | 'CLIMAERROR_CHARGING_MODE'
        | 'CLIMAERROR_HEATER_DEFECT'
        | 'CLIMAERROR_CYCLE_PROTECTION'
        | 'CLIMAERROR_NO_ENERGY_SOURCE';
}

export interface ClimatisationStateTrigger {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    trigger:
        | 'CLIMASTATETRIGGER_UNDEFINED'
        | 'CLIMASTATETRIGGER_NO_TRIGGER'
        | 'CLIMASTATETRIGGER_IMMEDIATE'
        | 'CLIMASTATETRIGGER_TIMER_BASED'
        | 'CLIMASTATETRIGGER_UNLOCK_CLIMATIZATION'
        | 'CLIMASTATETRIGGER_CONTINUING';
}

export interface CsoTopicList {
    csotopic: string;
}

export interface ClimaActiveTimerId {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    timerNumber:
        | 'TIMERNUMBER_UNDEFINED'
        | 'TIMERNUMBER_NO_TIMER_USED'
        | 'TIMERNUMBER_TIMER_1_ACTIVE'
        | 'TIMERNUMBER_TIMER_2_ACTIVE'
        | 'TIMERNUMBER_TIMER_3_ACTIVE'
        | 'TIMERNUMBER_TIMER_1_TIMER_2_ACTIVE';
}

export interface UpdateServerConnectionInfo {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    updateServerBaseUrl: string;
}

export interface MoclInfo {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    certificate: string;
    alias: string;
}

export interface SmartChargingHistory {
    id: string;
    chargingHistoryId: number;
    chargingType:
        | 'TYPE_UNDEFINED'
        | 'TYPE_CHARGING_NOT_ACTIVE'
        | 'TYPE_AC_CHARGING_ACTIVE'
        | 'TYPE_DC_CHARGING_ACTIVE'
        | 'TYPE_AWC'
        | 'TYPE_DC_DC'
        | 'TYPE_HPC'
        | 'TYPE_ERROR';
    chargingEnergySum: number;
    chargingBatteryEnergy: number;
    chargingComfortEnergy: number;
    selfEnergy: number;
    chargingCosts: number;
    beginChargingSession: string;
    endChargingSession: string;
    chargingSessionDuration: number;
    startSoc: number;
    endSoc: number;
    chargingAccountName: string;
    currency: number;
    chargingProfileName: string;
    electricityTariffId: string;
    tariffSource: string;
    evseId: string;
    chargingSessionIdInfrastructure: string;
}

export interface BatteryChargingScenario {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    chargingScenario:
        | 'SCENARIO_UNDEFINED'
        | 'SCENARIO_OFF'
        | 'SCENARIO_CHARGING_TO_DEPARTURE_TIME_FINISHED'
        | 'SCENARIO_IMMEDIATLEY_CHARGING_FINISHED'
        | 'SCENARIO_OPTIMISED_CHARGING_FINISHED'
        | 'SCENARIO_CHARGING_TO_DEPARTURE_TIME_ACTIVE'
        | 'SCENARIO_IMMEDIATLEY_CHARGING_ACTIVE'
        | 'SCENARIO_OPTIMISED_CHARGING_ACTIVE'
        | 'SCENARIO_CHARGING_TO_DEPARTURE_TIME_WAITING'
        | 'SCENARIO_OPTIMISED_CHARGING_WAITING'
        | 'SCENARIO_NO_GRID_VOLTAGE'
        | 'SCENARIO_ERROR_LOCK'
        | 'SCENARIO_ERROR_CHARGING_SYSTEM'
        | 'SCENARIO_INITIALIZATION_CHARGING_COMMUNICATION'
        | 'SCENARIO_IMMEDIATELY_OPTIMISED_CHARGING_ACTIVE'
        | 'SCENARIO_IMMEDIATELY_OPTIMISED_CHARGING_FINISHED'
        | 'SCENARIO_EMERGENCY_CHARGING'
        | 'SCENARIO_CHARGING_INTERRUPT_BY_USER'
        | 'SCENARIO_PLUG_RELEASABLE';
}

export interface BatteryChargeMode {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    chargingMode:
        | 'MODE_UNDEFINED'
        | 'MODE_IMMEDIATELY_STOPPED'
        | 'MODE_IMMEDIATELY_DEFAULT'
        | 'MODE_IMMEDIATELY_PROFILE'
        | 'MODE_EXTENDED_PROFILE'
        | 'MODE_EXTENDED_STOPPED';
}

export interface CurrentChargeState {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    currentChargingState:
        | 'STATE_UNDEFINED'
        | 'STATE_NOT_READY_FOR_CHARGING'
        | 'STATE_READY_FOR_CHARGING'
        | 'STATE_CHARGING_HV_BATTERY'
        | 'STATE_DISCHARGING'
        | 'STATE_CHARGE_PURPOSE_REACHED_AND_NOT_CONSERVATION_CHARGING'
        | 'STATE_CHARGE_PURPOSE_REACHED_AND_CONSERVATION'
        | 'STATE_CONSERVATION_CHARGING'
        | 'STATE_CHARGING_ERROR'
        | 'STATE_BIDIRECTIONAL_CHARGING';
}

export interface PowerSupplyState {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    state:
        | 'STATE_UNDEFINED'
        | 'STATE_INFRASTRUCTURE_STATE_UNAVAILABLE'
        | 'STATE_INFRASTRUCTURE_INITIALIZING'
        | 'STATE_INFRASTRUCTURE_STATE_READY'
        | 'STATE_INFRASTRUCTURE_STATE_ACTIVE'
        | 'STATE_INFRASTRUCTURE_ERROR';
}

export interface ChargingNotifications {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    notificationType:
        | 'TYPE_UNDEFINED'
        | 'TYPE_NOTIFICATION_1'
        | 'TYPE_NOTIFICATION_2'
        | 'TYPE_NOTIFICATION_3'
        | 'TYPE_NOTIFICATION_4'
        | 'TYPE_NOTIFICATION_5'
        | 'TYPE_NOTIFICATION_6';
    notificationValue:
        | 'NOTIFICATIONS_UNDEFINED'
        | 'NOTIFICATIONS_FAILED_BY_ELECTRIC_PARK_BRAKE'
        | 'NOTIFICATIONS_FAILED_BY_SUPPLY_VOLTAGE'
        | 'NOTIFICATIONS_FAILED_BY_BATTERY_TEMPERATURE'
        | 'NOTIFICATIONS_FAILED_BY_GENERAL_ERROR'
        | 'NOTIFICATIONS_FAILED_BY_OVERTEMPERATURE_OF_CHARGING_SOCKET'
        | 'NOTIFICATIONS_FAILED_DUE_TO_LOW_CHARGING_EFFICIENCY'
        | 'NOTIFICATIONS_FAILED_DUE_TO_CHARGE_INFRASTUCTURE'
        | 'NOTIFICATIONS_FAILED_CHARGE_PLUG'
        | 'NOTIFICATIONS_PNC_NO_VALID_CONTRACT'
        | 'NOTIFICATIONS_PNC_CONTRACT_OUT_OF_DATE'
        | 'NOTIFICATIONS_PNC_GENERAL_CONTRACT_ERROR'
        | 'NOTIFICATIONS_PNC_NO_VALID_CONTRACT_AT_THIS_EVSE'
        | 'NOTIFICATIONS_DC_CHARGING_NOT_POSSIBLE'
        | 'NOTIFICATIONS_CHARGING_SOCKET_TEMPERATURE_SENSOR_FAILURE'
        | 'NOTIFICATIONS_WARNING_TURTLE_RISK_LOW_TEMPERATURE_LOW_SOC'
        | 'NOTIFICATIONS_WARNING_TURTLE_RISK_LOW_TEMPERATURE_LOW_SOC_TONE'
        | 'NOTIFICATIONS_INFO_TURTLE_RISK_LOW_TEMPERATURE_LOW_SOC'
        | 'NOTIFICATIONS_GENERAL_ERROR'
        | 'NOTIFICATIONS_AC_CHARGING_NOT_POSSIBLE'
        | 'NOTIFICATIONS_CHARGING_SOCKET_TEMPERATURE_SENSOR_AC_FAILURE'
        | 'NOTIFICATIONS_START_INHIBIT_DUE_TO_2_PLUGS'
        | 'NOTIFICATIONS_UNLOCK_OF_CHARGE_PLUG_FAILED_ONLY_EMERGENCY_UNLOCK'
        | 'NOTIFICATIONS_PLEASE_CHARGE_THE_BATTERY_TO_AVOID_DAMAGE_TO_THE_BATTERY'
        | 'NOTIFICATIONS_WARNING_OF_OPEN_CHARGE_FLAP_MECHANICAL'
        | 'NOTIFICATIONS_WARNING_OF_OPEN_CHARGE_FLAP_MECHANICAL_DRIVE'
        | 'NOTIFICATIONS_WARNING_OF_OPEN_CHARGE_FLAP_ELECTRICAL'
        | 'NOTIFICATIONS_CHARGE_FLAP_DEFECT_MECHANICAL'
        | 'NOTIFICATIONS_CHARGE_FLAP_DEFECT_MECHANICAL_NOTE'
        | 'NOTIFICATIONS_CHARGE_FLAP_IMPAIRED_ELECTRICAL'
        | 'NOTIFICATIONS_CHARGE_FLAP_IMPAIRED_ELECTRICAL_NOTE'
        | 'NOTIFICATIONS_CHARGE_START_DELAY_DUE_TO_CONDITIONING_OF_BATTERY'
        | 'NOTIFICATIONS_CHARGE_START_DELAY_DUE_TO_ORU'
        | 'NOTIFICATIONS_EXTENSION_OF_CHARGING_TIME_DUE_TO_OVERTEMPERATURE_OF_CHARGING_SOCKET'
        | 'NOTIFICATIONS_EXTENSION_OF_CHARGING_TIME_DUE_TO_ON_BOARD_CHARGER'
        | 'NOTIFICATIONS_EXTENSION_OF_CHARGING_TIME_BY_USER_DUE_TO_CLIMA'
        | 'NOTIFICATIONS_EXTENSION_OF_CHARGING_TIME_DUE_TO_BATTERYLIMIT'
        | 'NOTIFICATIONS_EXTENSION_OF_CHARGING_TIME_DUE_TO_EMERGENCY_CHARGE'
        | 'NOTIFICATIONS_MAXIMUM_NUMBER_OF_EMERGENCY_CHARGES_REACHED'
        | 'NOTIFICATIONS_DC_CHARGING_PRIORITIZE'
        | 'NOTIFICATIONS_CHARGERATE_RESTRICTED_DUE_TO_CHARGE_CABLE'
        | 'NOTIFICATIONS_CHARGE_FLAP_NOT_UNLOCKED_DUE_TO_OVER_TEMPERATURE_OF_CHARGING_SOCKET'
        | 'NOTIFICATIONS_BAD_CHARGE_INFRASTUCTURE'
        | 'NOTIFICATIONS_PNC_AUTHENTICATION_ACTIVE'
        | 'NOTIFICATIONS_PNC_VALID_CONTRACT_ACCEPTED'
        | 'NOTIFICATIONS_PLUG_LOCK_FAILURE_AC'
        | 'NOTIFICATIONS_FAILED_BY_ISOLATION'
        | 'NOTIFICATIONS_FAILED_BY_PRECHARGE'
        | 'NOTIFICATIONS_FAILED_BY_CP_VOLTAGE'
        | 'NOTIFICATIONS_FAILED_BY_PLC_CONNECTION'
        | 'NOTIFICATIONS_FAILED_BY_AUTHENTICATION'
        | 'NOTIFICATIONS_FAILED_BY_COMMUNICATION_TIMEOUT'
        | 'NOTIFICATIONS_EXTENSION_OF_CHARGING_TIME_DUE_TO_EMERGENCY_CHARGE_TEMPERATURE_SENSOR_AC_FAILURE'
        | 'NOTIFICATIONS_EXTENSION_OF_CHARGING_TIME_DUE_TO_EMERGENCY_CHARGE_PLUG_LOCK_AC_FAILURE'
        | 'NOTIFICATIONS_EXTENSION_OF_CHARGING_TIME_DUE_TO_EMERGENCY_CHARGE_PP_AC_FAILURE'
        | 'NOTIFICATIONS_EXTENSION_OF_CHARGING_TIME_DUE_TO_EMERGENCY_CHARGE_FAILED_BY_CHARGE_PLUG'
        | 'NOTIFICATIONS_IT_SYSTEM_PE_RANGE_ACTIVE'
        | 'NOTIFICATIONS_FAILED_IT_SYSTEM_PE_RANGE_INACTIVE'
        | 'NOTIFICATIONS_FAILED_BY_PE'
        | 'NOTIFICATIONS_FAILED_CHARGINGSOCKET_RELEASE_NIBBLE_FAILURE'
        | 'NOTIFICATIONS_FAILED_WARNING_OF_OPEN_CHARGEFLAP_PART_ELEKCTRICAL'
        | 'NOTIFICATIONS_FAILED_CHARGE_FLAP_DEFECT_PART_ELECTRICAL'
        | 'NOTIFICATIONS_FAILED_CHARGE_FLAP_DEFECT_PART_ELECTRICAL_NOTE'
        | 'NOTIFICATIONS_EXTENSION_OF_CHARGING_TIME_GENERAL_VEHICLE'
        | 'NOTIFICATIONS_EXTENSION_OF_CHARGING_TIME_GENERAL_INFRASTRUCTURE'
        | 'NOTIFICATIONS_FAILED_BY_LATCH_DETECTION'
        | 'NOTIFICATIONS_FAILED_COMPATIBILITY_MODE_RECOMMENDED'
        | 'NOTIFICATIONS_LOW_CHARGE_POWER_UNKNOWN_IPB'
        | 'NOTIFICATIONS_AWC_FAILURE';
    flapSide: 'SIDE_UNDEFINED' | 'SIDE_LEFT' | 'SIDE_RIGHT' | 'SIDE_BOTH';
}

export interface Keys {
    identifier: number;
    standardAccessProfile: string;
    friendlyName: string;
    keyIdentifier: string;
    validityStartTime: number;
    validityEndTime: number;
    state: string;
    daysToExpiration: number;
    expirationConfirmed: boolean;
}

export interface AllowedTopicList {
    allowedTopicList: string;
}

export interface StringArray {
    value: string;
}

export interface TireStatus {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    pressure: number;
    targetPressure: number;
    type:
        | 'TYPE_UNDEFINED'
        | 'TYPE_WINTER'
        | 'TYPE_SUMMER'
        | 'TYPE_ALL_SEASON'
        | 'TYPE_OFFROAD'
        | 'TYPE_ULTRA_HIGH_PERFORMANCE'
        | 'TYPE_E_DISTANCE'
        | 'TYPE_E_PERFORMANCE'
        | 'TYPE_SPARE_TIRE'
        | 'TYPE_CUSTOMER_SPECIFIC';
    state:
        | 'STATE_UNDEFINED'
        | 'STATE_TIRESTATE_OK'
        | 'STATE_STRONG_WARNING'
        | 'STATE_WEAK_WARNING'
        | 'STATE_ERROR'
        | 'STATE_STATE_UNKNOWN'
        | 'STATE_BREAKDOWN'
        | 'STATE_WHEEL_MASKED_OUT'
        | 'STATE_PRESSURE_STORED'
        | 'STATE_BATTERY_LOW'
        | 'STATE_PRESSURE_NOTIFICATION'
        | 'STATE_TEMPORARY_NOT_WORKING'
        | 'STATE_CONTROLLIGHT'
        | 'STATE_GENERAL_WARNING_1'
        | 'STATE_GENERAL_WARNING_2'
        | 'STATE_GENERAL_WARNING_3'
        | 'STATE_ACOUSTIC'
        | 'STATE_GENERAL_LAMB_TEXT'
        | 'STATE_TIREEXCHANGE_DETECTED';
}

export interface StatefulAcceptItSystemPeRange {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    acceptItSystemPeRange: 'STATE_UNDEFINED' | 'STATE_ACTIVATED' | 'STATE_DEACTIVATED';
}

export interface PrivacySetup {
    isAnonymousDataProcessingAllowed: boolean;
    isBalancedInterestDataProcessingAllowed: boolean;
    isConsentDataProcessingAllowed: boolean;
    isDormantDataProcessingAllowed: boolean;
    isLocationDataProcessingAllowed: boolean;
    isPersonalDataProcessingAllowed: boolean;
    isTrackingDataProcessingAllowed: boolean;
}

export interface ReverseGear {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    timestamp: number;
    value: boolean;
}

export interface TurnIndicator {
    left: boolean;
    right: boolean;
}

export interface HumidityOutside {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    humidity: number;
    temperature: number;
    statusTimestamp: number;
    humidityTimestamp: number;
    temperatureTimestamp: number;
}

export interface DewPoint {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    dewPoint: number;
    statusTimestamp: number;
    dewPointTimestamp: number;
}

export interface Brightness {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    brightness: number;
    sunintensitiyleft: number;
    sunintensitiyright: number;
    statusTimestamp: number;
    brightnessTimestamp: number;
    sunintensitiyleftTimestamp: number;
    sunintensitiyrightTimestamp: number;
}

export interface BrightnessForward {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    fieldbrightness: number;
    fowardbrightness: number;
    statusTimestamp: number;
    fieldbrightnessTimestamp: number;
    fowardbrightnessTimestamp: number;
}

export interface FrontObjectDetection {
    longdistancevaluetype: 'VALUETYPE_UNDEFINED' | 'VALUETYPE_INIT' | 'VALUETYPE_ERROR' | 'VALUETYPE_LOGICAL' | 'VALUETYPE_PHYSICAL';
    longdistancevalue: number;
    latdistancevaluetype: 'VALUETYPE_UNDEFINED' | 'VALUETYPE_INIT' | 'VALUETYPE_ERROR' | 'VALUETYPE_LOGICAL' | 'VALUETYPE_PHYSICAL';
    latdistancevalue: number;
    relvelocity: number;
    objectClass:
        | 'OBJECTCLASS_UNDEFINED'
        | 'OBJECTCLASS_INIT'
        | 'OBJECTCLASS_DYNAMICALLY'
        | 'OBJECTCLASS_PEDESTRIAN'
        | 'OBJECTCLASS_TWOWHEELER'
        | 'OBJECTCLASS_ATLEASTTWOWHEELER'
        | 'OBJECTCLASS_CAR'
        | 'OBJECTCLASS_ATLEASTFOURWHEELER'
        | 'OBJECTCLASS_TRUCK'
        | 'OBJECTCLASS_UNKNOWN';
    objectClassPlausibility: number;
    videoID: number;
    internalObjectNumber: number;
}

export interface SideObjectDetection {
    distancevalue: number;
    relvelocity: number;
}

export interface RearObjectDetection {
    distancevalue: number;
    relvelocity: number;
    distancevalueLateral: number;
    relvelocityLateral: number;
    objectID: number;
    objectClass:
        | 'OBJECTCLASS_UNDEFINED'
        | 'OBJECTCLASS_UNKNWON'
        | 'OBJECTCLASS_DYNAMICALLY'
        | 'OBJECTCLASS_VULNERABLEROADUSER'
        | 'OBJECTCLASS_PEDESTRIAN'
        | 'OBJECTCLASS_PEDESTRIANGROUP'
        | 'OBJECTCLASS_BICYCLE'
        | 'OBJECTCLASS_MOTORCYCLE'
        | 'OBJECTCLASS_CAR'
        | 'OBJECTCLASS_ATLEASTFOURWHEELER'
        | 'OBJECTCLASS_TRUCK'
        | 'OBJECTCLASS_TWOWHEELER'
        | 'OBJECTCLASS_ANIMAL'
        | 'OBJECTCLASS_ATLEASTTWOWHEELER'
        | 'OBJECTCLASS_OBJECTCLUSTER'
        | 'OBJECTCLASS_INIT';
}

export interface FrontSensorState {
    blindness: boolean;
    error: boolean;
    unavailablity: boolean;
}

export interface SideSensorState {
    state:
        | 'STATE_UNDEFINED'
        | 'STATE_NOT_ACTIVE'
        | 'STATE_ACTIVE'
        | 'STATE_BLOCKED'
        | 'STATE_ERROR'
        | 'STATE_INIT'
        | 'STATE_QM'
        | 'STATE_ASIL';
    selfGlare: 'SELFGLARE_NOTDETECTED' | 'SELFGLARE_DETECTED';
    statusLightning: 'STATUSLIGHTNING_INACTIVE' | 'STATUSLIGHTNING_ACTIVE';
    visibilityPhysicalValue: number;
}

export interface RearSensorState {
    state: 'STATE_UNDEFINED' | 'STATE_OFF' | 'STATE_PASSIVE' | 'STATE_ACTIVE' | 'STATE_ERROR';
}

export interface StatusCpd {
    status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
    mobileGsm: 'MOBILEGSM_UNDEFINED' | 'MOBILEGSM_NO_WARNING' | 'MOBILEGSM_WARNING' | 'MOBILEGSM_RESERVED';
    callCenter: 'CALLCENTER_UNDEFINED' | 'CALLCENTER_NO_WARNING' | 'CALLCENTER_ALARM' | 'CALLCENTER_ABORT' | 'CALLCENTER_RESERVED';
    deactTemp: 'DEACTTEMP_UNDEFINED' | 'DEACTTEMP_INIT' | 'DEACTTEMP_NO_WARNING' | 'DEACTTEMP_WARNING';
    deactPermanent: 'DEACTPERMANENT_UNDEFINED' | 'DEACTPERMANENT_INIT' | 'DEACTPERMANENT_NO_WARNING' | 'DEACTPERMANENT_WARNING';
}

export interface TgiTriggerToGdc {
    statusUpdateTrigger: number;
    batchUpdateTrigger: number;
}

export interface PrivacyModes {
    isFullPrivacyModeActive: boolean;
    isDormantModeActive: boolean;
    isPermanentFlightModeActive: boolean;
}

export interface DiagAssemblyStatusResponse {
    diagAssemblyStatus: string;
    hash: string;
    timestamp: number;
    returnStatus:
        | 'RETURNSTATUS_UNDEFINDED'
        | 'RETURNSTATUS_SUCCESS'
        | 'RETURNSTATUS_GENERAL_ERROR'
        | 'RETURNSTATUS_INVALID_PARAMETERS'
        | 'RETURNSTATUS_RESOURCE_BUSY'
        | 'RETURNSTATUS_ASSEMBLY_STATUS_NOT_READY'
        | 'RETURNSTATUS_EXCLUSIVE_ACCESS_GRANTED_TO_ANOTHER_CLIENT'
        | 'RETURNSTATUS_KEYUNKNOWN'
        | 'RETURNSTATUS_RESULT_FORMAT_NOT_SUPPORTED'
        | 'RETURNSTATUS_UNKNOWN_REQUESTID'
        | 'RETURNSTATUS_FUNCTION_NOT_SUPPORTED_FOR_GIVENKEY'
        | 'RETURNSTATUS_RESPONSE_TIMEOUT'
        | 'RETURNSTATUS_NODE_UNKNOWN'
        | 'RETURNSTATUS_CLIENT_NOTAUTHORIZED'
        | 'RETURNSTATUS_SCHEMA_MISMATCH';
}

export interface RemoteStartResponse {
    sflResultData: number;
    sflResultCode:
        | 'RESULTCODE_UNDEFINED'
        | 'RESULTCODE_SUCCESSFUL'
        | 'RESULTCODE_NOTSUCCESSFUL'
        | 'RESULTCODE_ABORTSUCCESSFUL'
        | 'RESULTCODE_ABORTNOTSUCCESSFUL'
        | 'RESULTCODE_REMOTESTARTACTIVE'
        | 'RESULTCODE_CLAMP15ACTIVE'
        | 'RESULTCODE_CLAMPSACTIVE'
        | 'RESULTCODE_CARUNLOCKED'
        | 'RESULTCODE_TRUNKOPEN'
        | 'RESULTCODE_BONNETOPEN'
        | 'RESULTCODE_VEHICLEMOVEMENTDETECTED'
        | 'RESULTCODE_COOLANTLEVELTOOLOW'
        | 'RESULTCODE_MAXNUMBERSOFREMOTESTARTREACHED'
        | 'RESULTCODE_ANTITHEFTALARMSYSTEMACTIVE'
        | 'RESULTCODE_PANICALARMACTIVE'
        | 'RESULTCODE_STEERINGWHEELLOCKOPEN'
        | 'RESULTCODE_ROOFOPEN'
        | 'RESULTCODE_TIMEOUTSYSTEMPARTNER'
        | 'RESULTCODE_ERRORSYSTEMPARTNERDETECTED'
        | 'RESULTCODE_HAZARDLIGHTSACTIVE'
        | 'RESULTCODE_MAXRUNTIMEREMOTESTARTREACHED'
        | 'RESULTCODE_ENGINESTARTDURATIONTOOLONG'
        | 'RESULTCODE_ENGINESHUTDOWNUNEXPECTED'
        | 'RESULTCODE_REMOTESTARTSHUTDOWNVIAKEYFOBRST'
        | 'RESULTCODE_REMOTESTARTSHUTDOWNVIAENGINE'
        | 'RESULTCODE_TIMECLAMP15DRIVERSTAKEOVER'
        | 'RESULTCODE_ABORTCLAMP15ACTIVATION'
        | 'RESULTCODE_ABORTVIACLAMPCOORDINATOR'
        | 'RESULTCODE_ERRORCLAMPCOORDINATOR'
        | 'RESULTCODE_ABORTCAROPENED'
        | 'RESULTCODE_ERRORFUELCAPACITY'
        | 'RESULTCODE_ENGINECLEARANCEREMOTESTARTFAIL'
        | 'RESULTCODE_FUELALERTDRIVERINFORMATION'
        | 'RESULTCODE_INTERNALERRORREMOTESTART'
        | 'RESULTCODE_VEHICLECONTROLDETECTED'
        | 'RESULTCODE_REMOTESTARTACTIVATIONVIAEFFBFORBIDDEN'
        | 'RESULTCODE_ABORTVIAAPP'
        | 'RESULTCODE_PARKINGBRAKENOTAPPLIED'
        | 'RESULTCODE_PARKINGASSISTANCEACTIVE'
        | 'RESULTCODE_INCORRECTSPIN'
        | 'RESULTCODE_INCORRECTCAPTCHA'
        | 'RESULTCODE_INPUTEXECUTIONTOOFAST'
        | 'RESULTCODE_MOBILEDEVICESIGNATUREINCORRECT'
        | 'RESULTCODE_CHECKSUMERROR'
        | 'RESULTCODE_INVEHICLECOMMUNICATIONERROR'
        | 'RESULTCODE_OUTDATEDSTARTCOMMAND'
        | 'RESULTCODE_VINMISMATCHDETECTED'
        | 'RESULTCODE_OUTDATEDFUSEPPAIRINGREQUEST'
        | 'RESULTCODE_TIMEOUTWHILEWAITINGFORSFL'
        | 'RESULTCODE_ERRORDURINGSFLVERIFICATION'
        | 'RESULTCODE_VALIDATIONOFIDENTIFICATIONDATAFAILEDBYFAZIT';
}

export interface SpecialFunctionLoginBackendResponse {
    sflData: number;
}

export interface DeactivationResponse {
    deactivationResponse:
        | 'RESULTCODE_UNDEFINED'
        | 'RESULTCODE_SUCCESSFUL'
        | 'RESULTCODE_NOTSUCCESSFUL'
        | 'RESULTCODE_ABORTSUCCESSFUL'
        | 'RESULTCODE_ABORTNOTSUCCESSFUL'
        | 'RESULTCODE_REMOTESTARTACTIVE'
        | 'RESULTCODE_CLAMP15ACTIVE'
        | 'RESULTCODE_CLAMPSACTIVE'
        | 'RESULTCODE_CARUNLOCKED'
        | 'RESULTCODE_TRUNKOPEN'
        | 'RESULTCODE_BONNETOPEN'
        | 'RESULTCODE_VEHICLEMOVEMENTDETECTED'
        | 'RESULTCODE_COOLANTLEVELTOOLOW'
        | 'RESULTCODE_MAXNUMBERSOFREMOTESTARTREACHED'
        | 'RESULTCODE_ANTITHEFTALARMSYSTEMACTIVE'
        | 'RESULTCODE_PANICALARMACTIVE'
        | 'RESULTCODE_STEERINGWHEELLOCKOPEN'
        | 'RESULTCODE_ROOFOPEN'
        | 'RESULTCODE_TIMEOUTSYSTEMPARTNER'
        | 'RESULTCODE_ERRORSYSTEMPARTNERDETECTED'
        | 'RESULTCODE_HAZARDLIGHTSACTIVE'
        | 'RESULTCODE_MAXRUNTIMEREMOTESTARTREACHED'
        | 'RESULTCODE_ENGINESTARTDURATIONTOOLONG'
        | 'RESULTCODE_ENGINESHUTDOWNUNEXPECTED'
        | 'RESULTCODE_REMOTESTARTSHUTDOWNVIAKEYFOBRST'
        | 'RESULTCODE_REMOTESTARTSHUTDOWNVIAENGINE'
        | 'RESULTCODE_TIMECLAMP15DRIVERSTAKEOVER'
        | 'RESULTCODE_ABORTCLAMP15ACTIVATION'
        | 'RESULTCODE_ABORTVIACLAMPCOORDINATOR'
        | 'RESULTCODE_ERRORCLAMPCOORDINATOR'
        | 'RESULTCODE_ABORTCAROPENED'
        | 'RESULTCODE_ERRORFUELCAPACITY'
        | 'RESULTCODE_ENGINECLEARANCEREMOTESTARTFAIL'
        | 'RESULTCODE_FUELALERTDRIVERINFORMATION'
        | 'RESULTCODE_INTERNALERRORREMOTESTART'
        | 'RESULTCODE_VEHICLECONTROLDETECTED'
        | 'RESULTCODE_REMOTESTARTACTIVATIONVIAEFFBFORBIDDEN'
        | 'RESULTCODE_ABORTVIAAPP'
        | 'RESULTCODE_PARKINGBRAKENOTAPPLIED'
        | 'RESULTCODE_PARKINGASSISTANCEACTIVE'
        | 'RESULTCODE_INCORRECTSPIN'
        | 'RESULTCODE_INCORRECTCAPTCHA'
        | 'RESULTCODE_INPUTEXECUTIONTOOFAST'
        | 'RESULTCODE_MOBILEDEVICESIGNATUREINCORRECT'
        | 'RESULTCODE_CHECKSUMERROR'
        | 'RESULTCODE_INVEHICLECOMMUNICATIONERROR'
        | 'RESULTCODE_OUTDATEDSTARTCOMMAND'
        | 'RESULTCODE_VINMISMATCHDETECTED'
        | 'RESULTCODE_OUTDATEDFUSEPPAIRINGREQUEST'
        | 'RESULTCODE_TIMEOUTWHILEWAITINGFORSFL'
        | 'RESULTCODE_ERRORDURINGSFLVERIFICATION'
        | 'RESULTCODE_VALIDATIONOFIDENTIFICATIONDATAFAILEDBYFAZIT';
}

export interface AuthProviderInfo {
    url: string;
    scope: string;
}

export interface AuthCodeRequest {
    ssoid: string;
}

export interface AuthCodeResponse {
    ssoid: string;
    authCode: string;
    errorMessage: string;
}

export interface BatteryCareMode {
    bcamActivation: 'BCAMACTIVATION_UNDEFINED' | 'BCAMACTIVATION_ACTIVATED' | 'BCAMACTIVATION_DEACTIVATED';
    chargeBcamThreshold: number;
    bcamNotification:
        | 'NOTIFICATION_UNDEFINED'
        | 'NOTIFICATION_BCAMSCOREVALUEREACHED'
        | 'NOTIFICATION_BCAMSCOREVALUEWARNING'
        | 'NOTIFICATION_EXTENDEDCHARGINGNOTIFYBCAMISOFF'
        | 'NOTIFICATION_EXTENDEDCHARGINGSOCRESETINNEXTCHARGINGPROCESS'
        | 'NOTIFICATION_IMMEDIATECHARGINGNOTIFYBCAMISOFF'
        | 'NOTIFICATION_IMMEDIATECHARGINGSOCRESETINNEXTCHARGINGPROCESS';
    bcamPopup: 'POPUP_UNDEFINED' | 'POPUP_ENUMBCAMINFORMATIONSCREEN' | 'POPUP_BCAMINITIALINFORMATIONSCREEN';
}

export interface ChargingOptCompatibilityMode {
    compatibilityMode: 'CMODE_UNDEFINED' | 'CMODE_OFF' | 'CMODE_PERMANENT' | 'CMODE_ONCE';
}

export interface ActiveTargetSoc {
    activeTargetSoc: 'ATS_UNDEFINED' | 'ATS_CHARGEBULKTHRESHOLD' | 'ATS_TARGETSOC' | 'ATS_FULLSOC' | 'ATS_NAVTARGETSOC';
}

export interface CpaAdaptions {
    activeMode:
        | 'ACTIVEMODE_UNDEFINED'
        | 'ACTIVEMODE_INACTIVE'
        | 'ACTIVEMODE_OFFLINEMODE'
        | 'ACTIVEMODE_ONLINEMODE'
        | 'ACTIVEMODE_BOOSTCHARGINGMODE'
        | 'ACTIVEMODE_BOOSTCHARGINGMODEDERATING';
    targetChargePower: number;
    targetChargePowerStatus: 'TSPSTATUS_UNDEFINED' | 'TSPSTATUS_IDLE' | 'TSPSTATUS_PENDING' | 'TSPSTATUS_VALID';
}

export interface EspSpeed {
    espVelocityValue: number;
    espVelocityValueQualityBit:
        | 'ESPVELOCITYVALUEQUALITYBIT_UNDEFINED'
        | 'ESPVELOCITYVALUEQUALITYBIT_VALID'
        | 'ESPVELOCITYVALUEQUALITYBIT_INITERRORORSUBSTITUTED';
    espVelocityQualityQualifier:
        | 'ESPVELOCITYQUALITYQUALIFIER_UNDEFINED'
        | 'ESPVELOCITYQUALITYQUALIFIER_SMALLER1KMH'
        | 'ESPVELOCITYQUALITYQUALIFIER_SMALLER5KMH'
        | 'ESPVELOCITYQUALITYQUALIFIER_SMALLER3KMH'
        | 'ESPVELOCITYQUALITYQUALIFIER_SMALLER10KMH'
        | 'ESPVELOCITYQUALITYQUALIFIER_SMALLER20KMH'
        | 'ESPVELOCITYQUALITYQUALIFIER_BIGGEREQUAL20KMH'
        | 'ESPVELOCITYQUALITYQUALIFIER_INIT'
        | 'ESPVELOCITYQUALITYQUALIFIER_ERROR';
}

export interface PositionsQuality {
    latency: number;
    statusFixType: number;
    gDop: number;
    hDop: number;
    pDop: number;
    vDop: number;
}

export interface AccStatusDisplay {
    statusDisplay:
        | 'STATUSDISPLAY_UNDEFINED'
        | 'STATUSDISPLAY_ACC_GRA_MAINSWITCHOFF'
        | 'STATUSDISPLAY_ACC_ININITNOTINGRA'
        | 'STATUSDISPLAY_ACC_GRA_PASSIVE'
        | 'STATUSDISPLAY_ACC_GRA_ACTIVE'
        | 'STATUSDISPLAY_ACC_GRA_BACKGROUNDOVERDRIVE'
        | 'STATUSDISPLAY_ACC_GRA_SHUTDOWNREACTION'
        | 'STATUSDISPLAY_ACC_REVERSIBLEOFFNOTINGRA'
        | 'STATUSDISPLAY_ACC_GRA_NONREVERSIBLEOFF';
}

export interface HvNetworkInformation {
    hvNetworkStatus:
        | 'HVNETSTATUS_UNDEFINED'
        | 'HVNETSTATUS_AUS'
        | 'HVNETSTATUS_AKTIVIERUNG'
        | 'HVNETSTATUS_DIAGNOSE'
        | 'HVNETSTATUS_AKTIV'
        | 'HVNETSTATUS_FAHRBETRIEB'
        | 'HVNETSTATUS_AC_LADEBETRIEB'
        | 'HVNETSTATUS_DC_LADEBETRIEB'
        | 'HVNETSTATUS_AKTIV_OHNE_HVSPEICHER'
        | 'HVNETSTATUS_AUS_FEHLERFALL'
        | 'HVNETSTATUS_LASTFREIE_ABSCHALTUNG'
        | 'HVNETSTATUS_NOTABSCHALTUNG'
        | 'HVNETSTATUS_ENTLADUNG'
        | 'HVNETSTATUS_INIT';
    isHvNetworkActive: boolean;
}

export interface TopViewSetupStreamProperty {
    configurationStatus:
        | 'UNDEFINED'
        | 'INITIALIZATION'
        | 'READY_FOR_CONFIGURATION'
        | 'CONFIG_VALID'
        | 'CONFIG_INVALID'
        | 'STREAMING'
        | 'HIGHER_PRIORITY_TASK'
        | 'STREAMING_DEFAULT_STREAM'
        | 'CAMERA_ERROR'
        | 'TOPVIEW_INTERNAL_ERROR'
        | 'OVERTEMPERATURE_ERROR'
        | 'MEMORY_ERROR'
        | 'IMAGE_PROCESSING_ERROR';
}

export interface ResultStatus {
    result:
        | 'RESULT_UNDEFINED'
        | 'RESULT_OK'
        | 'RESULT_ERROR'
        | 'RESULT_NO_ACCESS'
        | 'RESULT_NOT_FOUND'
        | 'RESULT_NOT_AVAILABLE'
        | 'RESULT_NOT_SUPPORTED'
        | 'RESULT_TIMEOUT';
    resultDescription: string;
}

export interface KeepConnectOn {
    keepConnectOnStatus:
        | 'KEEPCONNECTONSTATUS_UNDEFINED'
        | 'KEEPCONNECTONSTATUS_ALWAYSON'
        | 'KEEPCONNECTONSTATUS_OFF'
        | 'KEEPCONNECTONSTATUS_ON'
        | 'KEEPCONNECTONSTATUS_PERSISTEDON';
}

export interface VCData<T> {
    data: T;
    topic: string;
}

interface TypeMap {
    'cso/v1/vehicle/highvoltage/battery/state/soc/displayed': StatefulFloat;
    'cso/v1/vehicle/highvoltage/charging/power': StatefulFloat;
    'cso/v1/vehicle/highvoltage/battery/state/range/displayed': HVBatteryRange;
    'cso/v1/vehicle/highvoltage/battery/plug/frontleft1': BatteryPlugStatus;
    'cso/v1/vehicle/highvoltage/battery/plug/frontleft2': BatteryPlugStatus;
    'cso/v1/vehicle/highvoltage/battery/plug/frontright1': BatteryPlugStatus;
    'cso/v1/vehicle/highvoltage/battery/plug/frontright2': BatteryPlugStatus;
    'cso/v1/vehicle/highvoltage/battery/plug/rearleft1': BatteryPlugStatus;
    'cso/v1/vehicle/highvoltage/battery/plug/rearleft2': BatteryPlugStatus;
    'cso/v1/vehicle/highvoltage/battery/plug/rearright1': BatteryPlugStatus;
    'cso/v1/vehicle/highvoltage/battery/plug/rearright2': BatteryPlugStatus;
    'cso/v1/vehicle/highvoltage/battery/plug/front': BatteryPlugStatus;
    'cso/v1/vehicle/body/exterior/doors/1/left': DoorStatus;
    'cso/v1/vehicle/body/exterior/doors/1/right': DoorStatus;
    'cso/v1/vehicle/body/exterior/doors/2/left': DoorStatus;
    'cso/v1/vehicle/body/exterior/doors/2/right': DoorStatus;
    'cso/v1/vehicle/body/exterior/windows/1/left': WindowStatus;
    'cso/v1/vehicle/body/exterior/windows/1/right': WindowStatus;
    'cso/v1/vehicle/body/exterior/windows/2/left': WindowStatus;
    'cso/v1/vehicle/body/exterior/windows/2/right': WindowStatus;
    'cso/v1/vehicle/car2x/v2c/breakdowncall/isActive': StatefulBool;
    'cso/v1/drivingenvironment/time/utc': SimpleTime;
    'cso/v1/vehicle/infotainment/time/pltOffset': StatefulUInt64;
    'cso/v1/vehicle/motion/longitudinal/speed/displayed': StatefulUInt32;
    'cso/v1/vehicle/motion/longitudinal/speed/measured': StatefulFloat;
    'cso/v1/vehicle/trailer/isPresent': StatefulBool;
    'cso/v1/vehicle/body/exterior/lights/lowbeam/status': StatefulBool;
    'cso/v1/vehicle/body/exterior/lights/highbeam/status': StatefulBool;
    'cso/v1/vehicle/body/exterior/lights/fog/front/status': StatefulBool;
    'cso/v1/vehicle/body/exterior/lights/fog/rear/status': StatefulBool;
    'cso/v1/vehicle/body/exterior/lights/parking/left/status': StatefulBool;
    'cso/v1/vehicle/body/exterior/lights/parking/right/status': StatefulBool;
    'cso/v1/vehicle/body/exterior/lights/warning/status': StatefulBool;
    'cso/v1/vehicle/body/exterior/lights/warning/isPanicModeOn': Bool;
    'cso/v1/vehicle/body/exterior/wiper/front/interval': WiperInterval;
    'cso/v1/vehicle/body/exterior/wiper/front/isCleaning': StatefulBool;
    'cso/v1/vehicle/body/exterior/wiper/rear/isCleaning': StatefulBool;
    'cso/v1/vehicle/body/exterior/wiper/front/frequency/requested': StatefulUInt32;
    'cso/v1/vehicle/body/exterior/wiper/front/frequency/measured': StatefulUInt32;
    'cso/v1/vehicle/car2x/v2c/emergencycall/state': EmergencyCallState;
    'cso/v1/vehicle/adas/emergencyassist/state': EmergencyAssistState;
    'cso/v1/vehicle/friction/estimating': FrictionEstimating;
    'cso/v1/vehicle/location/detailed/deadReckoningWithoutMM': DetailedLocationWithoutMM;
    'cso/v1/vehicle/location/detailed/deadReckoning': DetailedLocation;
    'cso/v1/drivingenvironment/weathercondition/precipitation': WeatherCondition;
    'cso/v1/drivingenvironment/trafficrules/trafficHandedness': TrafficHandedness;
    'cso/v1/drivingenvironment/roadattributes/isUrbanArea': StatefulBool;
    'cso/v1/drivingenvironment/roadattributes/isInsideCity': StatefulBool;
    'cso/v1/drivingenvironment/roadattributes/laneinformation/nbrAcceleration': StatefulUInt32;
    'cso/v1/drivingenvironment/roadattributes/laneinformation/nbrDeceleration': StatefulUInt32;
    'cso/v1/drivingenvironment/roadattributes/laneinformation/rampType': RampType;
    'cso/v1/drivingenvironment/roadattributes/laneinformation/currentIndex': StatefulUInt32;
    'cso/v1/drivingenvironment/roadattributes/laneinformation/totalNumber': StatefulUInt32;
    'cso/v1/drivingenvironment/roadattributes/laneinformation/totalNumberOpposite': StatefulUInt32;
    'cso/v1/drivingenvironment/trafficrules/speedLimit': SpeedLimit;
    'cso/v1/drivingenvironment/roadattributes/streetClass': StatefulUInt32;
    'cso/v1/drivingenvironment/roadattributes/functionalRoadClass': StatefulUInt32;
    'cso/v1/vehicle/tripstatistics/total/mileage': StatefulUInt32;
    'cso/v1/vehicle/staticdata/vin': String;
    'cso/v1/drivingenvironment/outdoorTemperature': StatefulFloat;
    'cso/v1/vehicle/body/exterior/hood/isClosed': StatefulBool;
    'cso/v1/vehicle/body/exterior/trunklid/isClosed': StatefulBool;
    'cso/v1/vehicle/body/exterior/trunklid/isLocked': StatefulBool;
    'cso/v1/vehicle/powertrain/combustion/fuel/percent': StatefulFloat;
    'cso/v1/vehicle/infotainment/settings/systemLanguage': StatefulString;
    'cso/v1/vehicle/chassis/brake/parkingbrake/state': ParkingBrakeState;
    'cso/v1/vehicle/antitheftsystem/isArmed': Bool;
    'cso/v1/vehicle/antitheftsystem/isAlarming': AntiTheftSystemAlarmingStatus;
    'cso/v1/vehicle/powertrain/combustion/engine/lubricant/percent': Float;
    'cso/v1/vehicle/powertrain/combustion/engine/lubricant/isBelowMinimum': Bool;
    'cso/v1/vehicle/diagnostics/vendorspecific/ecuPartNumber': String;
    'cso/v1/vehicle/diagnostics/vendorspecific/ecuSerialNumber': String;
    'cso/v1/vehicle/diagnostics/vendorspecific/ecuSoftwareVersion': String;
    'cso/v1/vehicle/diagnostics/vendorspecific/ecuSoftwareName': StatefulString;
    'cso/v1/vehicle/diagnostics/vendorspecific/ecuHardwareVersion': String;
    'cso/v1/vehicle/staticdata/steeringsystem/steeringWheelPosition': SteeringWheelPosition;
    'cso/v1/vehicle/infotainment/settings/user/date': StatefulString;
    'cso/v1/vehicle/maintenance/remainingRangeToOilChange': StatefulFloat;
    'cso/v1/vehicle/maintenance/remainingRangeToInspection': StatefulFloat;
    'cso/v1/vehicle/maintenance/daysToOilChange': StatefulUInt32;
    'cso/v1/vehicle/maintenance/daysToInspection': StatefulUInt32;
    'cso/v1/vehicle/highvoltage/charging/type': ElectricChargingType;
    'cso/v1/vehicle/adas/cruisecontrol/cruiseControlSystem': CruiseControlSystem;
    'cso/v1/vehicle/adas/cruisecontrol/cruiseControlSystemStatus': CruiseControlSystemStatus;
    'cso/v1/vehicle/adas/cruisecontrol/desiredSpeed': StatefulFloat;
    'cso/v1/vehicle/adas/cruisecontrol/desiredDistance': CruiseControlDesiredDistance;
    'cso/v1/vehicle/accessmanagement/numberOfLearnedKeys': UInt32;
    'cso/v1/vehicle/accessmanagement/isImmobilizerActivated': Bool;
    'cso/v1/vehicle/connectivity/privacy/setupShape3': PrivacySetupShape3;
    'cso/v1/vehicle/highvoltage/charging/remainingtime/target': StatefulUInt32;
    'cso/v1/vehicle/highvoltage/battery/state/temperature': StatefulFloat;
    'cso/v1/vehicle/body/exterior/wiper/fluidStatus': WiperFluidLevelStatus;
    'cso/v1/vehicle/body/interior/seats/1/right/isBeltBuckled': StatefulBool;
    'cso/v1/vehicle/body/interior/seats/2/right/isBeltBuckled': StatefulBool;
    'cso/v1/vehicle/body/interior/seats/3/right/isBeltBuckled': StatefulBool;
    'cso/v1/vehicle/body/interior/seats/2/middle/isBeltBuckled': StatefulBool;
    'cso/v1/vehicle/body/interior/seats/3/middle/isBeltBuckled': StatefulBool;
    'cso/v1/vehicle/body/interior/seats/1/left/isBeltBuckled': StatefulBool;
    'cso/v1/vehicle/body/interior/seats/2/left/isBeltBuckled': StatefulBool;
    'cso/v1/vehicle/body/interior/seats/3/left/isBeltBuckled': StatefulBool;
    'cso/v1/vehicle/hvac/state': ClimatisationState;
    'cso/v1/vehicle/body/exterior/crashIntensity': CrashIntensity;
    'cso/v1/vehicle/car2x/v2c/cloudconnectivity/mobilenetwork/status': MobileNetworkStatus;
    'cso/v1/vehicle/users/currentuser/ssoid': String;
    'cso/v1/vehicle/highvoltage/charging/bulkThreshold': StatefulUInt32;
    'cso/v1/vehicle/highvoltage/charging/remainingtime/bulk': StatefulUInt32;
    'cso/v1/vehicle/highvoltage/charging/reason': BatteryChargingReason;
    'cso/v1/vehicle/highvoltage/charging/timer/targetReachable': NextChargingTimerTargetReachable;
    'cso/v1/vehicle/highvoltage/charging/timer/estimatedStartTimeDate': StatefulString;
    'cso/v1/vehicle/highvoltage/charging/timer/estimatedFinishTimeDate': StatefulString;
    'cso/v1/vehicle/highvoltage/charging/profile/activeProfileId': String;
    'cso/v1/vehicle/hvac/settings/targetTemperature': StatefulTemperatureKelvin;
    'cso/v1/vehicle/hvac/settings/frontleft/isEnabled': StatefulBool;
    'cso/v1/vehicle/hvac/settings/frontright/isEnabled': StatefulBool;
    'cso/v1/vehicle/hvac/settings/rearleft/isEnabled': StatefulBool;
    'cso/v1/vehicle/hvac/settings/rearright/isEnabled': StatefulBool;
    'cso/v1/vehicle/hvac/settings/isClimaOnAtUnlock': StatefulBool;
    'cso/v1/vehicle/hvac/state/remainingTime': StatefulFloat;
    'cso/v1/vehicle/hvac/settings/isMirrorHeatingAllowed': StatefulBool;
    'cso/v1/vehicle/hvac/isWindowHeatingOn': StatefulBool;
    'cso/v1/vehicle/highvoltage/charging/rate': ChargingRateRangePerTime;
    'cso/v1/vehicle/hvac/error': ClimatisationError;
    'cso/v1/vehicle/hvac/state/activationReason': ClimatisationStateTrigger;
    'cso/v1/vehicle/powermanagement/clampinformation/isClamp15On': StatefulBool;
    'vcsystem/v1/csoTopicList': CsoTopicList;
    'cso/v1/vehicle/body/interior/cabinTemperature': StatefulFloat;
    'cso/v1/vehicle/hvac/activeTimerId': ClimaActiveTimerId;
    'vcsystem/v1/bootstrapping/updateServerConnectionInfo': UpdateServerConnectionInfo;
    'vcsystem/v1/authentication/moclInfo': MoclInfo;
    'cso/v1/vehicle/highvoltage/charging/chargingHistory': SmartChargingHistory;
    'cso/v1/vehicle/highvoltage/charging/scenario': BatteryChargingScenario;
    'cso/v1/vehicle/highvoltage/charging/mode': BatteryChargeMode;
    'cso/v1/vehicle/highvoltage/charging/currentChargingState': CurrentChargeState;
    'cso/v1/vehicle/highvoltage/charging/plug/frontleft1/powerSupplyState': PowerSupplyState;
    'cso/v1/vehicle/highvoltage/charging/plug/frontleft2/powerSupplyState': PowerSupplyState;
    'cso/v1/vehicle/highvoltage/charging/plug/frontright1/powerSupplyState': PowerSupplyState;
    'cso/v1/vehicle/highvoltage/charging/plug/frontright2/powerSupplyState': PowerSupplyState;
    'cso/v1/vehicle/highvoltage/charging/plug/rearleft1/powerSupplyState': PowerSupplyState;
    'cso/v1/vehicle/highvoltage/charging/plug/rearleft2/powerSupplyState': PowerSupplyState;
    'cso/v1/vehicle/highvoltage/charging/plug/rearright1/powerSupplyState': PowerSupplyState;
    'cso/v1/vehicle/highvoltage/charging/plug/rearright2/powerSupplyState': PowerSupplyState;
    'cso/v1/vehicle/highvoltage/charging/plug/front/powerSupplyState': PowerSupplyState;
    'cso/v1/vehicle/highvoltage/charging/notifications': ChargingNotifications;
    'cso/v1/vehicle/highvoltage/battery/state/range/routeBased': HVBatteryRange;
    'cso/v1/vehicle/hvac/state/requiredRunningTime': StatefulFloat;
    'cso/v1/vehicle/accessmanagement/mobiledevicekey/keys': Keys;
    'vcsystem/v1/claims/allowedtopiclist/{iotserviceid}': AllowedTopicList;
    'cso/v1/vehicle/highvoltage/charging/profile/profileIdList': StringArray;
    'cso/v1/vehicle/body/exterior/lights/standing/status': StatefulBool;
    'cso/v1/vehicle/highvoltage/charging/remainingtime/targetNav': StatefulUInt32;
    'cso/v1/vehicle/chassis/tires/frontleft/status': TireStatus;
    'cso/v1/vehicle/chassis/tires/frontright/status': TireStatus;
    'cso/v1/vehicle/chassis/tires/rearleft/status': TireStatus;
    'cso/v1/vehicle/chassis/tires/rearright/status': TireStatus;
    'cso/v1/vehicle/highvoltage/charging/chargingoptions/acceptItSystemPeRange': StatefulAcceptItSystemPeRange;
    'cso/v1/vehicle/connectivity/privacy/setupGen4': PrivacySetup;
    'cso/v1/vehicle/powertrain/drivetrain/gearbox/reverseGear': ReverseGear;
    'cso/v1/vehicle/body/exterior/lights/turnIndicator': TurnIndicator;
    'cso/v1/drivingenvironment/weathercondition/humidity': HumidityOutside;
    'cso/v1/drivingenvironment/weathercondition/dewpoint': DewPoint;
    'cso/v1/drivingenvironment/weathercondition/brightness': Brightness;
    'cso/v1/drivingenvironment/weathercondition/brightnessforward': BrightnessForward;
    'cso/v1/vehicle/adas/objectdetection/frontfused/targetobject': FrontObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/frontfused/leftadjacentlaneobject': FrontObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/frontfused/rightadjacentlaneobject': FrontObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/frontfused/2ndtargetobject': FrontObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/frontfused/2ndleftadjacentlaneobject': FrontObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/frontfused/2ndrightadjacentlaneobject': FrontObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/frontcamera/targetobject': SideObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/frontcamera/leftadjacentlaneobject': SideObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/frontcamera/rightadjacentlaneobject': SideObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/frontcamera/2ndtargetobject': SideObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/frontcamera/2ndleftadjacentlaneobject': SideObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/frontcamera/2ndrightadjacentlaneobject': SideObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/rearradar/targetobject': RearObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/rearradar/leftadjacentlaneobject': RearObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/rearradar/rightadjacentlaneobject': RearObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/rearradar/2ndtargetobject': RearObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/rearradar/2ndleftadjacentlaneobject': RearObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/rearradar/2ndrightadjacentlaneobject': RearObjectDetection;
    'cso/v1/vehicle/adas/objectdetection/frontfused/state': FrontSensorState;
    'cso/v1/vehicle/adas/objectdetection/frontcamera/state': SideSensorState;
    'cso/v1/vehicle/adas/objectdetection/rearradar/state': RearSensorState;
    'cso/v1/vehicle/factoryreset': Bool;
    'cso/v1/vehicle/childpresencedetection/status': StatusCpd;
    'cso/v1/vehicle/highvoltage/charging/chargingoptions/targetSoc': StatefulFloat;
    'cso/v1/vehicle/highvoltage/charging/chargingoptions/targetSoc/set': StatefulFloat;
    'vcsystem/v1/tgi/cloudoutputtrigger': TgiTriggerToGdc;
    'cso/v1/vehicle/body/exterior/centrallocking/isLockedExternal': StatefulBool;
    'cso/v1/vehicle/users/userlist': StringArray;
    'cso/v1/vehicle/connectivity/privacy/modes': PrivacyModes;
    'cso/v1/vehicle/diagmaster/updateassemblystatus': String;
    'cso/v1/vehicle/diagmaster/diagassemblystatus/get': DiagAssemblyStatusResponse;
    'cso/v1/vehicle/remotestart/startResponse': RemoteStartResponse;
    'cso/v1/vehicle/specialfunctionlogin/backendResponse': SpecialFunctionLoginBackendResponse;
    'cso/v1/vehicle/remotestart/updateStatus': DeactivationResponse;
    'cso/v1/vehicle/remotestart/stopRequest': DeactivationResponse;
    'vcsystem/v1/tokenmanagement/azpinfo': AuthProviderInfo;
    'vcsystem/v1/tokenmanagement/authcode/request': AuthCodeRequest;
    'vcsystem/v1/tokenmanagement/authcode/response': AuthCodeResponse;
    'cso/v1/vehicle/highvoltage/charging/batterycaremode/bcamStatus': BatteryCareMode;
    'cso/v1/vehicle/highvoltage/charging/chargingoptions/compatibilityMode': ChargingOptCompatibilityMode;
    'cso/v1/vehicle/highvoltage/charging/activeTargetSoc': ActiveTargetSoc;
    'cso/v1/vehicle/highvoltage/battery/preconditioningTemperature': StatefulFloat;
    'cso/v1/vehicle/highvoltage/charging/chargepoweradaption/adaptions': CpaAdaptions;
    'cso/v1/vehicle/motion/longitudinal/speed/esp': EspSpeed;
    'cso/v1/vehicle/location/detailed/rawGnss': DetailedLocationWithoutMM;
    'cso/v1/vehicle/location/detailed/positionsQuality': PositionsQuality;
    'cso/v1/vehicle/adas/cruisecontrol/acc/accStatusDisplay': AccStatusDisplay;
    'cso/v1/autoedge/baselineVersion': String;
    'cso/v1/vehicle/highvoltage/battery/capacity': StatefulFloat;
    'cso/v1/vehicle/highvoltage/battery/maxChargePower': StatefulUInt32;
    'app-services/extendedwakingphase/v1/hvNetworkInformation': HvNetworkInformation;
    'cso/v1/vehicle/powermanagement/clampinformation/isClampSOn': StatefulBool;
    'app-services/bdp/v1/topviewsetup/streamProperties': TopViewSetupStreamProperty;
    'app-services/bdp/v1/topviewsetup/cameraConfig/set': ResultStatus;
    'app-services/extendedwakingphase/v1/keepConnectOn': KeepConnectOn;
}

function cso<T extends keyof TypeMap>(type: T): TypeMap[T] {
    return {} as TypeMap[T];
}
