import { View, TouchableOpacity } from 'react-native'
import { H3, P } from '../text'
import { ICON_LARGE, PRIMARY_COLOR_TRANSPARENT, DARK, spacing, typography, LIGHT, styles, layouts } from '../../styles'
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/Ionicons'


export default function CardsArray({ tasksCounts = [], navigation }) {
    const { t } = useTranslation();
    return (

        <View
            style={[spacing.mt5, spacing.p3, spacing.br2, { elevation: 2, backgroundColor: PRIMARY_COLOR_TRANSPARENT }]}
        >
            <H3 style={[spacing.mb3, typography.textBold]}>
                {t("task_management")}
            </H3>
            <View style={styles.attendanceContainer}>
                {tasksCounts.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[spacing.mv4, styles.gridItem, spacing.bw1, spacing.br2, spacing.p4]}
                        onPress={() => {
                            if (item.label === "Installation") {
                                navigation.navigate("taskScreen");
                            }
                        }}
                    >
                        <Icon name={item.icon} size={ICON_LARGE} color={DARK} />
                        <P>{item.label}</P>
                        <View
                            style={[styles.bgPrimary,
                            layouts.circle625,
                            layouts.center,
                            styles.notificationBadgeContainer,
                            { right: 20, top: 4 }
                            ]}
                        >
                            <P style={{ color: LIGHT, fontWeight: "bold" }}>
                                {item.count}
                            </P>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}